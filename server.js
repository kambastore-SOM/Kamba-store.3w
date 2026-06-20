const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_FILE = path.join(DATA_DIR, 'store.json');
const MANAGER_PASSWORD = 'kamba2025';

// Ensure folders exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = 'img_' + Date.now() + '_' + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per photo
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Apenas imagens são permitidas'));
  }
});

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(UPLOADS_DIR));

// ===== DEFAULT DATA =====
const defaultProducts = [
  {id:1,emoji:'👟',name:'Nike Air Force 1',cat:'Calçado',price:35000,img:null,imgs:[],desc:''},
  {id:2,emoji:'👕',name:'Camiseta Polo',cat:'Roupas',price:8500,img:null,imgs:[],desc:''},
  {id:3,emoji:'📱',name:'Samsung A15',cat:'Tecnologia',price:95000,img:null,imgs:[],desc:''},
  {id:4,emoji:'🎧',name:'Fones Bluetooth',cat:'Tecnologia',price:18000,img:null,imgs:[],desc:''},
  {id:5,emoji:'👜',name:'Mala Feminina',cat:'Acessórios',price:22000,img:null,imgs:[],desc:''},
  {id:6,emoji:'⌚',name:'Relógio Smartwatch',cat:'Tecnologia',price:45000,img:null,imgs:[],desc:''},
  {id:7,emoji:'👗',name:'Vestido Elegante',cat:'Roupas',price:19000,img:null,imgs:[],desc:''},
  {id:8,emoji:'🩳',name:'Calção Desportivo',cat:'Roupas',price:7500,img:null,imgs:[],desc:''},
  {id:9,emoji:'💻',name:'Laptop Lenovo',cat:'Tecnologia',price:280000,img:null,imgs:[],desc:''},
  {id:10,emoji:'🎮',name:'Joystick PS5',cat:'Games',price:42000,img:null,imgs:[],desc:''},
  {id:11,emoji:'👒',name:'Chapéu de Sol',cat:'Acessórios',price:5500,img:null,imgs:[],desc:''},
  {id:12,emoji:'🕶️',name:'Óculos Ray-Ban',cat:'Acessórios',price:28000,img:null,imgs:[],desc:''},
  {id:13,emoji:'👔',name:'Camisa Social',cat:'Roupas',price:12000,img:null,imgs:[],desc:''},
  {id:14,emoji:'🎒',name:'Mochila Escolar',cat:'Acessórios',price:16500,img:null,imgs:[],desc:''},
  {id:15,emoji:'📷',name:'Câmera Canon',cat:'Tecnologia',price:175000,img:null,imgs:[],desc:''},
  {id:16,emoji:'🛁',name:'Set Beleza Feminina',cat:'Beleza',price:13500,img:null,imgs:[],desc:''},
  {id:17,emoji:'🏋️',name:'Halter 10kg',cat:'Desporto',price:9500,img:null,imgs:[],desc:''},
  {id:18,emoji:'🩴',name:'Sandálias de Praia',cat:'Calçado',price:6000,img:null,imgs:[],desc:''},
  {id:19,emoji:'🖨️',name:'Impressora HP',cat:'Tecnologia',price:68000,img:null,imgs:[],desc:''},
  {id:20,emoji:'🛋️',name:'Almofada Decorativa',cat:'Casa',price:7000,img:null,imgs:[],desc:''},
  {id:21,emoji:'🍳',name:'Frigideira Antiaderente',cat:'Casa',price:11000,img:null,imgs:[],desc:''},
  {id:22,emoji:'🧴',name:'Creme Hidratante',cat:'Beleza',price:4500,img:null,imgs:[],desc:''},
  {id:23,emoji:'👠',name:'Salto Alto Elegante',cat:'Calçado',price:24000,img:null,imgs:[],desc:''},
  {id:24,emoji:'🎽',name:'Camisola de Treino',cat:'Desporto',price:9000,img:null,imgs:[],desc:''},
  {id:25,emoji:'📚',name:'Kit de Papelaria',cat:'Escola',price:5500,img:null,imgs:[],desc:''},
  {id:26,emoji:'🔌',name:'Carregador Universal',cat:'Tecnologia',price:8500,img:null,imgs:[],desc:''},
  {id:27,emoji:'🧢',name:'Boné Snapback',cat:'Acessórios',price:6500,img:null,imgs:[],desc:''},
  {id:28,emoji:'🧸',name:'Urso de Pelúcia',cat:'Brinquedos',price:7500,img:null,imgs:[],desc:''},
  {id:29,emoji:'🎁',name:'Caixa de Presente',cat:'Presentes',price:4000,img:null,imgs:[],desc:''},
  {id:30,emoji:'💄',name:'Batom + Gloss Set',cat:'Beleza',price:9500,img:null,imgs:[],desc:''},
];

const defaultData = {
  products: defaultProducts,
  payMethods: ['Multicaixa Express','Transferência Bancária','Pagamento na Entrega'],
  paragens: ['Kilamba','11 de Novembro','Golf 2','Calemba 2'],
  contacts: [
    {type:'📞',label:'Telefone',value:'+244 923 000 000'},
    {type:'📍',label:'Endereço',value:'Luanda, Angola'}
  ],
  orderEmail: 'baracklast33@gmail.com',
  ejsSvcId: '', ejsTplId: '', ejsPubKey: '',
  payDetails: {mcx:'',iban:'',accName:''},
  logoImg: null,
  heroTitle: 'A Melhor Loja<br>de <span>Luanda</span> 🔥',
  heroSub: 'Produtos de qualidade entregues à sua paragem. Compre fácil, compre rápido.',
  aboutBox: '<strong>Kamba Store</strong> — uma loja criada pelo <strong>SOM Sistema Operacional de Multiplataforma</strong>, com o objetivo de facilitar a compra e venda em Luanda.',
  storeName: 'KAMBA <span>STORE</span>',
  fLogo: 'KAMBA <span>STORE</span>',
  cssRed: '#D62828', cssDark: '#141414', cssDark2: '#1E1E1E', cssBlack: '#0A0A0A',
};

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) { console.error('Load error:', e); }
  return defaultData;
}
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data), 'utf8');
}

// ===== API ROUTES =====

// Get all store data
app.get('/api/data', (req, res) => {
  res.json(loadData());
});

// Save all store data (requires password)
app.post('/api/data', (req, res) => {
  const { password, data } = req.body;
  if (password !== MANAGER_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorrecta' });
  }
  try {
    saveData(data);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Upload a photo - returns a public URL
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhuma foto enviada' });
  const url = '/uploads/' + req.file.filename;
  res.json({ success: true, url });
});

// Health check
app.get('/api/ping', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('✅ Kamba Store running on port ' + PORT);
});
