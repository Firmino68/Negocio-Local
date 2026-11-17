// ✏️ Edite este ficheiro para adaptar a página ao seu negócio.
// Os dados abaixo são de DEMONSTRAÇÃO (nomes, telefone, moradas e preços fictícios).
const TIPO = "salao"; // "salao", "oficina" ou "loja" (também pode usar ?tipo=oficina no endereço)

// Horário por dia (0 = domingo ... 6 = sábado): ["abre", "fecha"] ou null se fechado
const SEMANA = { 0: null, 1: ["09:00", "18:00"], 2: ["09:00", "18:00"], 3: ["09:00", "18:00"], 4: ["09:00", "18:00"], 5: ["09:00", "19:00"], 6: ["09:00", "15:00"] };

const NEGOCIOS = {
  salao: {
    schema: "HairSalon", emoji: "💇", name: "Beleza & Estilo", tagline: "Cabelo, unhas e maquilhagem com carinho",
    color: "#c2185b", soft: "#fdeef4", phone: "244900000000", address: "Rua Exemplo, Talatona, Luanda", slot: 30,
    navLabel: "Serviços", servicesTitle: "Os nossos serviços", bookTitle: "Marque o seu horário", svcLabel: "Serviço", bookCta: "Marcar", hours: SEMANA,
    items: [
      { id: "s1", name: "Corte feminino", desc: "Corte e acabamento ao seu estilo.", price: 5000, dur: "45 min" },
      { id: "s2", name: "Corte masculino", desc: "Corte clássico ou moderno.", price: 2500, dur: "30 min" },
      { id: "s3", name: "Tranças", desc: "Vários modelos, com ou sem extensões.", price: 12000, from: true, dur: "3 h" },
      { id: "s4", name: "Hidratação capilar", desc: "Tratamento para cabelo seco ou danificado.", price: 6000, dur: "1 h" },
      { id: "s5", name: "Manicure", desc: "Unhas tratadas e esmaltadas.", price: 3000, dur: "45 min" },
      { id: "s6", name: "Pedicure", desc: "Cuidado completo dos pés.", price: 3500, dur: "1 h" },
      { id: "s7", name: "Maquilhagem", desc: "Para festas, casamentos e eventos.", price: 8000, from: true, dur: "1 h" } ]
  },
  oficina: {
    schema: "AutoRepair", emoji: "🔧", name: "Auto Rápido", tagline: "Revisões e reparações com preço claro",
    color: "#e65100", soft: "#fff1e6", phone: "244900000000", address: "Estrada Exemplo, Viana, Luanda", slot: 60,
    navLabel: "Serviços", servicesTitle: "O que fazemos", bookTitle: "Marque a sua revisão", svcLabel: "Serviço", bookCta: "Marcar", hours: SEMANA,
    items: [
      { id: "o1", name: "Mudança de óleo e filtro", desc: "Óleo e filtro novos, com verificação de níveis.", price: 15000, from: true, dur: "45 min" },
      { id: "o2", name: "Revisão geral", desc: "Inspeção completa do veículo.", price: 35000, from: true, dur: "3 h" },
      { id: "o3", name: "Travões", desc: "Pastilhas, discos e fluido de travões.", price: 20000, from: true, dur: "1h30" },
      { id: "o4", name: "Diagnóstico eletrónico", desc: "Leitura de avarias e luzes do painel.", price: 10000, dur: "1 h" },
      { id: "o5", name: "Alinhamento e balanceamento", desc: "Mais conforto e menos desgaste dos pneus.", price: 12000, dur: "1 h" },
      { id: "o6", name: "Ar condicionado", desc: "Verificação e recarga de gás.", price: 18000, from: true, dur: "1h30" } ]
  },
  loja: {
    schema: "Store", emoji: "🛍️", name: "Casa & Cia", tagline: "Tudo para a sua casa, perto de si",
    color: "#00695c", soft: "#e8f5f2", phone: "244900000000", address: "Avenida Exemplo, Maianga, Luanda", slot: 30,
    navLabel: "Produtos", servicesTitle: "Produtos em destaque", bookTitle: "Reserve e levante na loja", svcLabel: "Produto", bookCta: "Reservar", hours: SEMANA,
    items: [
      { id: "l1", name: "Conjunto de panelas (5 peças)", desc: "Antiaderente, para todos os fogões.", price: 25000, dur: "Em stock" },
      { id: "l2", name: "Jogo de cama (casal)", desc: "Algodão, 4 peças.", price: 18000, dur: "Em stock" },
      { id: "l3", name: "Ventoinha de pé", desc: "3 velocidades, silenciosa.", price: 22000, dur: "Em stock" },
      { id: "l4", name: "Liquidificador 1,5 L", desc: "Potente, com copo de vidro.", price: 15000, dur: "Em stock" },
      { id: "l5", name: "Garrafa térmica 1 L", desc: "Mantém quente ou frio durante horas.", price: 6500, dur: "Em stock" },
      { id: "l6", name: "Candeeiro recarregável", desc: "Luz de emergência, com USB.", price: 9000, dur: "Em stock" } ]
  }
};
