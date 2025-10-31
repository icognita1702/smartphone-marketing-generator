// Gerador de Marketing para Smartphones - Script Principal
// Desenvolvido para Chrome Extension Manifest V3

class SmartphoneMarketingGenerator {
  constructor() {
    this.apiKey = '';
    this.currentState = 'config'; // config, loading, results, error
    this.marketingData = null;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSavedApiKey();
    this.setupSlider();
  }

  bindEvents() {
    // Botão principal de geração
    document.getElementById('generateBtn').addEventListener('click', () => {
      this.generateMarketingPackage();
    });

    // Botão de retry em caso de erro
    document.getElementById('retryBtn').addEventListener('click', () => {
      this.showSection('config');
    });

    // Tabs de resultados
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Salvar API key automaticamente
    document.getElementById('apiKeyInput').addEventListener('input', (e) => {
      this.saveApiKey(e.target.value);
    });

    // Botão sobre
    document.getElementById('aboutBtn').addEventListener('click', () => {
      this.showAbout();
    });
  }

  setupSlider() {
    const slider = document.getElementById('imageCount');
    const valueDisplay = document.getElementById('imageCountValue');
    
    slider.addEventListener('input', (e) => {
      valueDisplay.textContent = e.target.value;
    });
  }

  async loadSavedApiKey() {
    try {
      const result = await chrome.storage.local.get(['geminiApiKey']);
      if (result.geminiApiKey) {
        document.getElementById('apiKeyInput').value = result.geminiApiKey;
        this.apiKey = result.geminiApiKey;
      }
    } catch (error) {
      console.log('Erro ao carregar API key:', error);
    }
  }

  async saveApiKey(apiKey) {
    try {
      await chrome.storage.local.set({ geminiApiKey: apiKey });
      this.apiKey = apiKey;
    } catch (error) {
      console.log('Erro ao salvar API key:', error);
    }
  }

  async generateMarketingPackage() {
    const smartphoneName = document.getElementById('smartphoneInput').value.trim();
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    const imageCount = parseInt(document.getElementById('imageCount').value);

    // Validações
    if (!smartphoneName) {
      this.showError('Por favor, insira o nome do smartphone.');
      return;
    }

    if (!apiKey) {
      this.showError('Por favor, insira sua API Key do Gemini.');
      return;
    }

    this.apiKey = apiKey;
    await this.saveApiKey(apiKey);

    try {
      this.showSection('loading');
      this.updateLoadingMessage('Iniciando pesquisa inteligente...');

      // Fase 1: Pesquisa e Desconstrução
      const researchData = await this.performSmartphoneResearch(smartphoneName);
      
      this.updateLoadingMessage('Gerando conteúdo de marketing...');
      
      // Fase 2: Geração Criativa do Pacote de Marketing
      const marketingPackage = await this.generateCreativePackage(researchData, imageCount);
      
      this.marketingData = marketingPackage;
      this.displayResults(marketingPackage);
      this.showSection('results');
      
    } catch (error) {
      console.error('Erro na geração:', error);
      this.showError(`Erro ao gerar pacote de marketing: ${error.message}`);
    }
  }

  async performSmartphoneResearch(smartphoneName) {
    const researchPrompt = `
Você é um jornalista de tecnologia especializado em smartphones. Sua missão é realizar uma pesquisa exaustiva e forense sobre o smartphone "${smartphoneName}".

Pesquise na web e colete as seguintes informações ESPECÍFICAS e PRECISAS:

1. **Especificações Técnicas Exatas:**
   - Materiais de construção (ex: "Armor Aluminum", "Gorilla Glass Victus 2")
   - Nomes oficiais das cores disponíveis
   - Especificações detalhadas da câmera
   - Processador e chipset
   - Capacidade de bateria e recursos de carregamento
   - Tamanho de tela e tecnologia de display

2. **Design e Construção:**
   - Design do módulo da câmera
   - Formato e dimensões
   - Recursos de design únicos

3. **Público-Alvo e Posicionamento:**
   - Segmento de mercado
   - Principais casos de uso
   - Diferenciais competitivos

4. **Recursos Destacados:**
   - Principais funcionalidades
   - Tecnologias inovadoras
   - Recursos de software exclusivos

Retorne um relatório estruturado em JSON com todas essas informações precisas e verificadas. Use apenas informações factuas que você conseguir confirmar através de pesquisa.
`;

    const response = await this.callGeminiAPI(researchPrompt, true);
    
    try {
      // Tentar parsear como JSON, senão usar como texto
      return JSON.parse(response);
    } catch {
      return { rawResearch: response };
    }
  }

  async generateCreativePackage(researchData, imageCount) {
    const creativityPrompt = `
Você é um Diretor Criativo de uma gigante da tecnologia. Com base na pesquisa detalhada abaixo, crie um pacote de marketing completo e profissional.

**DADOS DA PESQUISA:**
${JSON.stringify(researchData, null, 2)}

**INSTRUÇÕES:**
Crie um pacote de marketing em formato JSON com a seguinte estrutura:

{
  "adTitles": [
    "5 títulos otimizados para SEO e apelo ao consumidor"
  ],
  "productDescription": "Descrição persuasiva e detalhada do produto (2-3 parágrafos)",
  "keyFeatures": [
    "📱 Característica 1 com emoji relevante",
    "🔋 Característica 2 com emoji relevante",
    "📸 Característica 3 com emoji relevante"
  ],
  "seoKeywords": [
    "palavras-chave", "para", "seo", "otimização"
  ],
  "mainImagePrompt": "Prompt técnico detalhado para imagem principal: smartphone perfeitamente iluminado em fundo branco, fotorrealista, renderização PBR, reflexos anisotrópicos",
  "creativePrompts": [
    "${imageCount} prompts técnicos diversos para diferentes ângulos de marketing"
  ]
}

**REQUISITOS PARA OS PROMPTS DE IMAGEM:**
- Use termos técnicos como "fotorrealista", "renderização PBR", "reflexos anisotrópicos"
- Inclua detalhes específicos do produto pesquisado
- Varie entre close-ups, lifestyle, detalhes dos materiais, ângulos dinâmicos
- Cada prompt deve ter pelo menos 2-3 linhas de descrição técnica

Retorne APENAS o JSON válido, sem texto adicional.
`;

    const response = await this.callGeminiAPI(creativityPrompt, false);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      throw new Error('Falha ao processar resposta da IA. Tente novamente.');
    }
  }

  async callGeminiAPI(prompt, useSearch = false) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: useSearch ? 0.1 : 0.7,
        topK: useSearch ? 1 : 40,
        topP: useSearch ? 0.1 : 0.95,
        maxOutputTokens: 8192,
      }
    };

    // Adicionar ferramenta de busca se necessário
    if (useSearch) {
      requestBody.tools = [{
        googleSearchRetrieval: {
          dynamicRetrievalConfig: {
            mode: "MODE_DYNAMIC",
            dynamicThreshold: 0.7
          }
        }
      }];
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Erro da API: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('Resposta inválida da API');
    }

    return data.candidates[0].content.parts[0].text;
  }

  displayResults(marketingPackage) {
    // Exibir títulos de anúncio
    const adTitlesContainer = document.getElementById('adTitles');
    adTitlesContainer.innerHTML = '';
    
    marketingPackage.adTitles?.forEach(title => {
      const item = this.createContentItem(title);
      adTitlesContainer.appendChild(item);
    });

    // Exibir descrição do produto
    const descriptionContainer = document.getElementById('productDescription');
    descriptionContainer.innerHTML = '';
    const descriptionItem = this.createContentText(marketingPackage.productDescription || 'Nenhuma descrição disponível');
    descriptionContainer.appendChild(descriptionItem);

    // Exibir características principais
    const featuresContainer = document.getElementById('keyFeatures');
    featuresContainer.innerHTML = '';
    
    marketingPackage.keyFeatures?.forEach(feature => {
      const item = this.createContentItem(feature);
      featuresContainer.appendChild(item);
    });

    // Exibir palavras-chave SEO
    const keywordsContainer = document.getElementById('seoKeywords');
    keywordsContainer.innerHTML = '';
    
    marketingPackage.seoKeywords?.forEach(keyword => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = keyword;
      keywordsContainer.appendChild(tag);
    });

    // Exibir prompt principal de imagem
    const mainPromptContainer = document.getElementById('mainImagePrompt');
    mainPromptContainer.innerHTML = '';
    const mainPromptItem = this.createContentText(marketingPackage.mainImagePrompt || 'Nenhum prompt disponível');
    mainPromptContainer.appendChild(mainPromptItem);

    // Exibir prompts criativos
    const creativePromptsContainer = document.getElementById('creativePrompts');
    creativePromptsContainer.innerHTML = '';
    
    marketingPackage.creativePrompts?.forEach((prompt, index) => {
      const item = this.createContentItem(`${index + 1}. ${prompt}`);
      creativePromptsContainer.appendChild(item);
    });
  }

  createContentItem(content) {
    const item = document.createElement('div');
    item.className = 'content-item';
    
    const text = document.createElement('span');
    text.textContent = content;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copiar';
    copyBtn.addEventListener('click', () => this.copyToClipboard(content, copyBtn));
    
    item.appendChild(text);
    item.appendChild(copyBtn);
    
    return item;
  }

  createContentText(content) {
    const item = document.createElement('div');
    item.className = 'content-text';
    item.textContent = content;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copiar';
    copyBtn.style.position = 'absolute';
    copyBtn.style.top = '10px';
    copyBtn.style.right = '10px';
    copyBtn.addEventListener('click', () => this.copyToClipboard(content, copyBtn));
    
    item.style.position = 'relative';
    item.appendChild(copyBtn);
    
    return item;
  }

  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      const originalText = button.textContent;
      button.textContent = 'Copiado!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  }

  switchTab(tabName) {
    // Atualizar botões das tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Atualizar conteúdo das tabs
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
  }

  showSection(sectionName) {
    const sections = ['config', 'loading', 'results', 'error'];
    
    sections.forEach(section => {
      const element = document.getElementById(`${section}Section`);
      if (element) {
        element.classList.add('hidden');
      }
    });
    
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    
    this.currentState = sectionName;
  }

  updateLoadingMessage(message) {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
      loadingMessage.textContent = message;
    }
  }

  showError(message) {
    document.getElementById('errorMessage').textContent = message;
    this.showSection('error');
  }

  showAbout() {
    alert(`Gerador de Marketing para Smartphones v1.0\n\nDesenvolvido com IA Gemini\nCriado por: Seu Nome\n\nEsta extensão utiliza inteligência artificial para gerar pacotes de marketing completos para smartphones, incluindo pesquisa automatizada e criação de conteúdo profissional.`);
  }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new SmartphoneMarketingGenerator();
});