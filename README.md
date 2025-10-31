# Gerador de Marketing para Smartphones 📱

**Extensão inteligente para Chrome que gera pacotes de marketing completos para smartphones usando IA e pesquisa em tempo real**

## 🚀 Funcionalidades

### Sistema Inteligente de Duas Fases

**Fase 1: Pesquisa e Desconstrução**
- Pesquisa profunda na web usando Gemini AI com Google Search
- Coleta de especificações técnicas exatas
- Análise de materiais, cores oficiais, e design
- Identificação do público-alvo e posicionamento

**Fase 2: Geração Criativa do Pacote**
- Geração de títulos otimizados para SEO
- Descrição persuasiva do produto
- Lista de características principais com emojis
- Palavras-chave para otimização
- Prompts técnicos para geração de imagens

### Interface Elegante
- Design escuro com acentos ciano/azul
- Layout responsivo e intuitivo
- Sistema de abas para organização
- Botões de cópia para facilitar o uso
- Feedback visual em tempo real

## 🛠️ Instalação

### Pré-requisitos
1. **API Key do Google AI Studio**
   - Acesse: https://aistudio.google.com/app/apikey
   - Crie uma nova API Key
   - Guarde a chave com segurança

### Passos de Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/icognita1702/smartphone-marketing-generator.git
   cd smartphone-marketing-generator
   ```

2. **Adicione os ícones:**
   - Crie uma pasta `icons/` no diretório raiz
   - Adicione os seguintes arquivos de ícone:
     - `icon16.png` (16x16 pixels)
     - `icon32.png` (32x32 pixels)
     - `icon48.png` (48x48 pixels)
     - `icon128.png` (128x128 pixels)
   - Sugestão: Use um ícone relacionado a smartphones/marketing

3. **Instale no Chrome:**
   - Abra o Chrome e vá para `chrome://extensions/`
   - Ative o "Modo do desenvolvedor" (canto superior direito)
   - Clique em "Carregar sem compactação"
   - Selecione a pasta do projeto
   - A extensão aparecerá na barra de ferramentas

## 📝 Como Usar

1. **Configuração Inicial:**
   - Clique no ícone da extensão
   - Insira sua API Key do Gemini
   - A chave será salva automaticamente

2. **Gerar Pacote de Marketing:**
   - Digite o nome do smartphone (ex: "iPhone 15 Pro Max")
   - Ajuste o número de prompts de imagem (3-10)
   - Clique em "Gerar Pacote de Marketing"

3. **Visualizar Resultados:**
   - **Aba "Textos do Anúncio"**: Títulos, descrição, características e palavras-chave
   - **Aba "Prompts de Imagem"**: Prompt principal e prompts criativos
   - Use os botões "Copiar" para transferir o conteúdo

## 🏗️ Arquitetura Técnica

### Estrutura de Arquivos
```
smartphone-marketing-generator/
├── manifest.json          # Configuração da extensão
├── popup.html            # Interface do usuário
├── popup.js              # Lógica principal
├── styles.css            # Estilos visuais
├── icons/               # Ícones da extensão
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # Documentação
```

### Tecnologias Utilizadas
- **Manifest V3**: Padrão mais recente para extensões Chrome
- **Gemini 2.0 Flash**: IA para pesquisa e geração de conteúdo
- **Google Search API**: Pesquisa inteligente integrada
- **Chrome Storage API**: Armazenamento seguro da API Key
- **ES6+ JavaScript**: Programação moderna e eficiente

### Fluxo de Funcionamento
1. **Input do Usuário** → Nome do smartphone + configurações
2. **Pesquisa IA** → Coleta de dados técnicos e especificações
3. **Processamento** → Análise e estruturação das informações
4. **Geração Creative** → Criação do pacote de marketing
5. **Apresentação** → Exibição organizada em abas

## 🎨 Exemplos de Saída

### Títulos de Anúncio
- "iPhone 15 Pro Max: Revolução em Titânio com Câmera 5x"
- "Descubra o Poder do A17 Pro no iPhone 15 Pro Max"
- "iPhone 15 Pro Max: Fotografia Profissional na Palma da Mão"

### Prompt de Imagem Principal
```
iPhone 15 Pro Max em titânio natural, perfeitamente iluminado em fundo branco minimalista, 
fotorrealista, renderização PBR com reflexos anisotrópicos no acabamento em titânio, 
iluminação de estúdio profissional, detalhes ultra-nítidos da câmera tripla periscópica...
```

## 🔧 Personalização

### Modificar Prompts de IA
Edite os prompts nos métodos `performSmartphoneResearch()` e `generateCreativePackage()` em `popup.js`

### Alterar Visual
Modifique as variáveis CSS em `styles.css` para personalizar cores e layout

### Adicionar Funcionalidades
Extenda a classe `SmartphoneMarketingGenerator` com novos métodos

## 🐛 Solução de Problemas

### Erro "API Key inválida"
- Verifique se a API Key está correta
- Confirme se a API do Gemini está ativada no Google AI Studio

### Extensão não carrega
- Verifique se todos os arquivos estão presentes
- Certifique-se de que os ícones estão na pasta `icons/`
- Recarregue a extensão em `chrome://extensions/`

### Resultados incompletos
- Tente com nomes de smartphones mais específicos
- Verifique sua conexão com a internet
- Aguarde alguns segundos entre tentativas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Compartilhar feedbacks

## 📧 Contato

Para dúvidas, sugestões ou suporte, entre em contato através do GitHub.

---

**Desenvolvido com ❤️ usando IA Gemini**