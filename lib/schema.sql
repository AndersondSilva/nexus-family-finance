-- NEXUS FAMILY FINANCE | SOVEREIGN SQL SCHEMA
-- Versão 2.0 (Julius Activation)

-- 1. Tabela de Perfis de Usuário
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  email TEXT UNIQUE,
  photo_url TEXT,
  family_id UUID,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabela de Categorias Dinâmicas
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT, -- Lucide icon name
  color TEXT,
  owner_id UUID REFERENCES profiles(id), -- NULL se for categoria padrão do sistema
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Tabela de Transações Soberanas
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')),
  scope TEXT CHECK (scope IN ('personal', 'family')),
  category_id UUID REFERENCES categories(id),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  family_id UUID,
  due_date DATE,
  bank TEXT,
  is_recurring BOOLEAN DEFAULT false,
  metadata JSONB, -- Para detalhes de proventos (férias, 13º, etc)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 5. Regras de Segurança Soberanas (RLS)

-- Profiles: Cada um vê apenas o seu
CREATE POLICY "Users can view their own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

-- Categories: Ver as padrões OU as criadas por você
CREATE POLICY "Viewable categories" ON categories 
  FOR SELECT USING (is_default = true OR owner_id = auth.uid());

-- Transactions: O NÚCLEO DA SOBERANIA
-- Regra de Escopo Pessoal: Apenas o dono vê
CREATE POLICY "Personal scope isolation" ON transactions 
  FOR SELECT USING (scope = 'personal' AND owner_id = auth.uid());

-- Regra de Escopo Familiar: Todos da família veem
CREATE POLICY "Family scope sharing" ON transactions 
  FOR SELECT USING (scope = 'family' AND family_id = (SELECT family_id FROM profiles WHERE id = auth.uid()));

-- Inserções e Deleções
CREATE POLICY "Owners can manage transactions" ON transactions 
  FOR ALL USING (owner_id = auth.uid());

-- 6. Dados Iniciais (Categorias Padrão)
INSERT INTO categories (name, icon, color, is_default) VALUES
  ('Salário', 'Briefcase', '#00f2ff', true),
  ('Alimentação', 'ShoppingBag', '#ff00d6', true),
  ('Lazer', 'Heart', '#adff2f', true),
  ('Saúde', 'Umbrella', '#ffaa00', true),
  ('Carro', 'CreditCard', '#3b82f6', true),
  ('Casa', 'Zap', '#ffffff', true);

-- 7. Tabela de Convites Familiares
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_email TEXT NOT NULL,
  from_uid UUID REFERENCES profiles(id) ON DELETE CASCADE,
  to_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- RLS para Convites
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view invitations sent/received" ON invitations
  FOR SELECT USING (
    auth.uid() = from_uid OR 
    to_email = (SELECT email FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can create invitations" ON invitations
  FOR INSERT WITH CHECK (auth.uid() = from_uid);

CREATE POLICY "Users can update received invitations" ON invitations
  FOR UPDATE USING (
    to_email = (SELECT email FROM profiles WHERE id = auth.uid())
  );

-- 8. Tabela de Feedback e Suporte
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create feedback" ON feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view feedback" ON feedback
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );


