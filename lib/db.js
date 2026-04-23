import { supabase } from './supabase';

/**
 * Adiciona uma nova transação ao Supabase.
 * @param {Object} transactionData - Dados da transação.
 * @param {string} userId - UID do usuário logado (UUID).
 * @param {string} familyId - ID da família do usuário (UUID).
 */
export const addTransaction = async (transactionData, userId, familyId) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          description: transactionData.description,
          amount: parseFloat(transactionData.amount),
          type: transactionData.type || 'expense',
          scope: transactionData.scope || 'family',
          category_id: transactionData.categoryId, // Usando categoryId se disponível
          owner_id: userId,
          family_id: familyId === 'default' ? null : familyId,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
};

/**
 * Busca transações com base no escopo e permissões.
 * @param {string} userId - UUID do usuário.
 * @param {string} familyId - UUID da família.
 * @param {string} scope - 'personal' ou 'family'.
 */
export const getTransactions = async (userId, familyId, scope = 'family') => {
  try {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        categories (
          name,
          icon,
          color
        )
      `)
      .order('created_at', { ascending: false });

    if (scope === 'personal') {
      query = query
        .eq('owner_id', userId)
        .eq('scope', 'personal');
    } else {
      // Garantir que 'default' ou nulo seja tratado corretamente
      const fId = (familyId === 'default' || !familyId) ? null : familyId;
      
      if (fId) {
        query = query.eq('family_id', fId);
      } else {
        // Se não tem família, busca apenas transações sem família do usuário no escopo familiar
        query = query.is('family_id', null).eq('owner_id', userId);
      }
      
      query = query.eq('scope', 'family');
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(t => ({
      ...t,
      category: t.categories?.name || 'Geral', // Compatibilidade com UI antiga
      createdAt: t.created_at
    }));
  } catch (error) {
    console.error("Error fetching transactions: ", error);
    throw error;
  }
};

/**
 * Busca o perfil do usuário para obter o familyId.
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data;
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw error;
  }
};

/**
 * Cria ou atualiza o perfil do usuário.
 */
export const upsertUserProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error upserting user profile: ", error);
    throw error;
  }
};

/**
 * Busca todas as categorias disponíveis (padrão + personalizadas do usuário).
 */
export const getCategories = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .or(`is_default.eq.true,owner_id.eq.${userId}`)
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error;
  }
};

/**
 * Cria um convite na tabela do Supabase.
 */
export const createInvitation = async (fromEmail, fromUid, toEmail) => {
  try {
    const { data, error } = await supabase
      .from('invitations')
      .insert([
        { from_email: fromEmail, from_uid: fromUid, to_email: toEmail.toLowerCase() }
      ])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw error;
  }
};

/**
 * Busca convites pendentes para o usuário atual.
 */
export const getPendingInvitations = async (email) => {
  try {
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('to_email', email.toLowerCase())
      .eq('status', 'pending');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching invitations:", error);
    throw error;
  }
};

/**
 * Aceita um convite e vincula o usuário à família.
 */
export const acceptInvitation = async (invitationId, userId, fromUid) => {
  try {
    // 1. Atualizar convite
    const { error: inviteError } = await supabase
      .from('invitations')
      .update({ status: 'accepted', accepted_at: new Date().toISOString() })
      .eq('id', invitationId);
    if (inviteError) throw inviteError;

    // 2. Garantir que o inviter tenha o próprio UID como family_id se estiver nulo
    const { data: inviterProfile } = await supabase
      .from('profiles')
      .select('family_id')
      .eq('id', fromUid)
      .single();
    
    const targetFamilyId = inviterProfile?.family_id || fromUid;
    
    if (!inviterProfile?.family_id) {
      await supabase
        .from('profiles')
        .update({ family_id: fromUid })
        .eq('id', fromUid);
    }

    // 3. Atualizar perfil do usuário que aceitou
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ family_id: targetFamilyId })
      .eq('id', userId);
    if (profileError) throw profileError;

    return true;
  } catch (error) {
    console.error("Error accepting invitation:", error);
    throw error;
  }
};

/**
 * Zera todos os dados do usuário (Danger Zone).
 */
export const resetUserData = async (userId) => {
  try {
    // 1. Deletar transações
    const { error: transError } = await supabase
      .from('transactions')
      .delete()
      .eq('owner_id', userId);
    if (transError) throw transError;

    // 2. Deletar categorias customizadas
    const { error: catError } = await supabase
      .from('categories')
      .delete()
      .eq('owner_id', userId);
    if (catError) throw catError;

    // 3. Deletar convites
    await supabase.from('invitations').delete().eq('from_uid', userId);
    
    // 4. Resetar perfil (tirar de família e resetar moeda se quiser)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ family_id: null, currency: 'pt-BR' })
      .eq('id', userId);
    if (profileError) throw profileError;

    return true;
  } catch (error) {
    console.error("Error resetting data:", error);
    throw error;
  }
};

/**
 * Salva um feedback ou mensagem de suporte no banco.
 */
export const saveFeedback = async (userId, message) => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert([{ user_id: userId, message }])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error saving feedback:", error);
    throw error;
  }
};

/**
 * Busca feedbacks enviados pelo usuário.
 */
export const getUserFeedback = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
};

/**
 * Atualiza a preferência de moeda/locale do usuário.
 */
export const updateUserCurrency = async (userId, currency) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ currency })
      .eq('id', userId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating currency:", error);
    throw error;
  }
};


