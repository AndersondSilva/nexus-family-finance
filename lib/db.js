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
