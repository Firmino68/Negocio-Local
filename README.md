# 📍 Página de Negócio Local

Modelo de página para **salões, oficinas e lojas**, com serviços, horário e **marcação por WhatsApp**. Feito com **HTML, CSS e JavaScript puro**, sem backend e sem custos de alojamento.

> Os dados incluídos (nomes, telefone, moradas e preços) são de **demonstração**.

## O problema que resolve

Muitos negócios locais não têm site: os clientes perguntam preços e horários por mensagem, e as marcações ficam desorganizadas. Esta página dá ao negócio uma presença online profissional e ao cliente um pedido de marcação já completo (serviço, data e hora), enviado direto para o WhatsApp.

## Um modelo, três negócios

| Tipo | Exemplo | Endereço de demonstração |
|---|---|---|
| 💇 Salão | Beleza & Estilo | `?tipo=salao` |
| 🔧 Oficina | Auto Rápido | `?tipo=oficina` |
| 🛍️ Loja | Casa & Cia | `?tipo=loja` |

Cada tipo muda cores, textos, serviços (ou produtos) e o intervalo entre horários.

## Funcionalidades

- Indicador **Aberto agora / Fechado**, com a próxima abertura ("abre amanhã às 09:00")
- Lista de serviços com preço, duração e botão **Marcar** que preenche o formulário
- **Marcação com horários reais:** gerados a partir do horário do negócio, sem dias fechados e sem horas que já passaram
- Mensagem de pedido formatada, enviada por **WhatsApp** (`wa.me`)
- Tabela de horário com o dia de hoje destacado, contacto e ligação para o mapa
- **SEO local:** dados estruturados JSON-LD (`HairSalon`, `AutoRepair` ou `Store`), para os motores de pesquisa
- Responsivo, acessível (navegação por teclado) e sem guardar dados dos clientes

## Como adaptar ao seu negócio

Edite apenas o `js/negocio.js`:

1. Mude `TIPO` para `"salao"`, `"oficina"` ou `"loja"`
2. Altere `name`, `tagline`, `phone` (com indicativo, ex.: `244923000000`), `address`, `color` e `soft`
3. Atualize o horário em `SEMANA` (`null` = fechado) e a lista `items`
4. Para um novo tipo de negócio, copie um bloco de `NEGOCIOS` e dê-lhe outro nome

## Estrutura

```
├── index.html
├── css/style.css
└── js/
    ├── negocio.js   # dados do negócio (edite aqui)
    └── app.js       # lógica da página
```

## Publicar

*Settings → Pages → Deploy from a branch → `main` / `(root)`*. Depois pode gerar um QR Code do link para cartões de visita e montras.

## Ideias para evoluir

- Galeria de fotos do trabalho
- Marcações guardadas num calendário (precisa de backend)
- Avaliações de clientes reais

## O que aprendi

- Gerar horários disponíveis a partir de regras (dias fechados, intervalos e hora atual)
- Criar um modelo reutilizável orientado a dados (um ficheiro de configuração para vários negócios)
- Dados estruturados (JSON-LD) para SEO local
- Formulários acessíveis com validação e integração com `wa.me`

## Autor

** Pedro Firmino** · [GitHub](https://github.com/Firmino68)
