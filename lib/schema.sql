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
