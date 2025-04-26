
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Research paper data
    const papers = [
      {
        id: 1,
        title: 'EEG-Based BCI Using Theta Waves for Motor Imagery Classification',
        authors: 'Smith et al.',
        year: 2023,
        type: 'Theta',
        device: 'Neurosky',
        paradigm: 'One paradigm',
        bciMethod: 'Spatial Filter',
        mlMethod: 'CSP',
        abstract: 'This study explores theta wave patterns during motor imagery tasks...',
        link: 'https://example.com/paper1' // Add this
      },
      {
        id: 2,
        title: 'Hybrid P300-SSVEP BCI with Alpha Wave Enhancement',
        authors: 'Johnson et al.',
        year: 2022,
        type: 'Alpha',
        device: 'Emotiv',
        paradigm: 'Hybrid',
        bciMethod: 'Wavelet Transform',
        mlMethod: 'SVM',
        abstract: 'Combining P300 and SSVEP paradigms with alpha wave processing...'
      },
      {
        id: 3,
        title: 'Gamma Wave Detection in EEG Using End-to-End Deep Learning',
        authors: 'Chen et al.',
        year: 2023,
        type: 'Gamma',
        device: 'OpenBCI',
        paradigm: 'One paradigm',
        bciMethod: 'Neural Network End-to-End Framework',
        mlMethod: 'MLP',
        abstract: 'Novel approach for gamma wave detection without manual feature extraction...'
      },
      {
        id: 4,
        title: 'Beta Wave Analysis for Artifact Detection in Mobile EEG',
        authors: 'Rodriguez et al.',
        year: 2021,
        type: 'Beta',
        device: 'InteraXon',
        paradigm: 'One paradigm',
        bciMethod: 'Digital Filter',
        mlMethod: 'Rule-based',
        abstract: 'Real-time artifact detection system using beta wave characteristics...'
      },
      {
        id: 5,
        title: 'Delta Wave Patterns in Sleep Monitoring BCI',
        authors: 'Kim et al.',
        year: 2022,
        type: 'Delta',
        device: 'MyndPlay',
        paradigm: 'One paradigm',
        bciMethod: 'Empirical Mode Decomposition',
        mlMethod: 'HMM',
        abstract: 'Sleep stage classification using delta wave analysis...'
      },
      {
        id: 6,
        title: 'Multiclass Motor Imagery Classification Using Riemannian Geometry',
        authors: 'Wilson et al.',
        year: 2023,
        type: 'Theta',
        device: 'OpenBCI',
        paradigm: 'One paradigm',
        bciMethod: 'Spatial Filter',
        mlMethod: 'Riemannian Geometry-Based Classification',
        abstract: 'Advanced classification method for motor imagery tasks...'
      }
    ];
    
    // Filter options
    const types = ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'];
    const devices = ['Neurosky', 'Emotiv', 'InteraXon', 'MyndPlay', 'OpenBCI'];
    const paradigms = ['One paradigm', 'Hybrid'];
    const bciMethods = ['Digital Filter', 'Spatial Filter', 'Wavelet Transform', 'Empirical Mode Decomposition', 'Neural Network End-to-End Framework'];
    const mlMethods = [
      'RLDA',
      'Riemannian Geometry-Based Classification',
      'LDA',
      'SVM',
      'CSP',
      'MLP',
      'Logistic Regression (LR)',
      'Cubic SVM',
      'Rule-based',
      'HMM',
      'CRF',
      'Feature-based'
    ];
    
    // State
    let state = {
      searchTerm: '',
      selectedTypes: [],
      selectedDevices: [],
      selectedParadigms: [],
      selectedBciMethods: [],
      selectedMlMethods: []
    };
    
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const typeFiltersContainer = document.getElementById('typeFilters');
    const deviceFiltersContainer = document.getElementById('deviceFilters');
    const paradigmFiltersContainer = document.getElementById('paradigmFilters');
    const bciMethodFiltersContainer = document.getElementById('bciMethodFilters');
    const mlMethodFiltersContainer = document.getElementById('mlMethodFilters');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultCount = document.getElementById('resultCount');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const activeFiltersDisplay = document.getElementById('activeFilters');
    
    // Initialize the app
    function init() {
      renderTypeFilters();
      renderDeviceFilters();
      renderParadigmFilters();
      renderBciMethodFilters();
      renderMlMethodFilters();
      renderResults();
      updateActiveFilters();
      setupEventListeners();
    }
    
    // Render filter buttons
    function renderFilterButtons(container, options, selectedOptions, filterType) {
      container.innerHTML = options.map(option => `
        <div 
          onclick="toggleFilter('${filterType}', '${option}')"
          class="filter-tag ${selectedOptions.includes(option) ? 'selected bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-800 border border-gray-300'}"
        >
          ${selectedOptions.includes(option) ? '<i data-lucide="check" class="w-3 h-3 mr-1"></i>' : ''}
          ${option}
        </div>
      `).join('');
      lucide.createIcons();
    }
    
    function renderTypeFilters() {
      renderFilterButtons(typeFiltersContainer, types, state.selectedTypes, 'type');
    }
    
    function renderDeviceFilters() {
      renderFilterButtons(deviceFiltersContainer, devices, state.selectedDevices, 'device');
    }
    
    function renderParadigmFilters() {
      renderFilterButtons(paradigmFiltersContainer, paradigms, state.selectedParadigms, 'paradigm');
    }
    
    function renderBciMethodFilters() {
      renderFilterButtons(bciMethodFiltersContainer, bciMethods, state.selectedBciMethods, 'bciMethod');
    }
    
    function renderMlMethodFilters() {
      renderFilterButtons(mlMethodFiltersContainer, mlMethods, state.selectedMlMethods, 'mlMethod');
    }
    
    // Render results
    function renderResults() {
      const filtered = filterPapers();
      resultCount.textContent = filtered.length;
      
      if (filtered.length === 0) {
        resultsContainer.innerHTML = `
          <div class="paper-card p-6 text-center">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <i data-lucide="frown" class="w-8 h-8 text-gray-400"></i>
            </div>
            <h4 class="text-lg font-medium text-gray-700">No papers found</h4>
            <p class="text-gray-500">Try adjusting your search or filters</p>
          </div>
        `;
        lucide.createIcons();
        return;
      }
      
      resultsContainer.innerHTML = filtered.map(paper => `
        <div class="paper-card p-6">
          <div class="flex flex-col md:flex-row md:justify-between gap-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-1">${paper.title}</h3>
              <p class="text-gray-600 mb-2">${paper.authors} • ${paper.year}</p>
              
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">${paper.type}</span>
                <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">${paper.device}</span>
                <span class="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">${paper.paradigm}</span>
                <span class="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">${paper.bciMethod}</span>
                <span class="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">${paper.mlMethod}</span>
              </div>
              
              <p class="text-gray-700">${paper.abstract}</p>
            </div>
            <div class="flex-shrink-0">
              <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                View Details
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    // Filter papers based on state
    function filterPapers() {
      return papers.filter(paper => {
        const matchesSearch = 
          paper.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || 
          paper.authors.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(state.searchTerm.toLowerCase());
        
        const matchesType = 
          state.selectedTypes.length === 0 || state.selectedTypes.includes(paper.type);
        
        const matchesDevice = 
          state.selectedDevices.length === 0 || state.selectedDevices.includes(paper.device);
        
        const matchesParadigm = 
          state.selectedParadigms.length === 0 || state.selectedParadigms.includes(paper.paradigm);
        
        const matchesBciMethod = 
          state.selectedBciMethods.length === 0 || state.selectedBciMethods.includes(paper.bciMethod);
        
        const matchesMlMethod = 
          state.selectedMlMethods.length === 0 || state.selectedMlMethods.includes(paper.mlMethod);
        
        return matchesSearch && matchesType && matchesDevice && matchesParadigm && matchesBciMethod && matchesMlMethod;
      });
    }
    
    // Update active filters display
    function updateActiveFilters() {
      const activeFilters = [];
      
      if (state.searchTerm) activeFilters.push(`Search: "${state.searchTerm}"`);
      if (state.selectedTypes.length > 0) activeFilters.push(`Types: ${state.selectedTypes.join(', ')}`);
      if (state.selectedDevices.length > 0) activeFilters.push(`Devices: ${state.selectedDevices.join(', ')}`);
      if (state.selectedParadigms.length > 0) activeFilters.push(`Paradigms: ${state.selectedParadigms.join(', ')}`);
      if (state.selectedBciMethods.length > 0) activeFilters.push(`BCI Methods: ${state.selectedBciMethods.join(', ')}`);
      if (state.selectedMlMethods.length > 0) activeFilters.push(`ML Methods: ${state.selectedMlMethods.join(', ')}`);
      
      activeFiltersDisplay.textContent = activeFilters.join(' • ') || 'No filters applied';
    }
    
    // Toggle filter selection
    function toggleFilter(filterType, value) {
      switch(filterType) {
        case 'type':
          state.selectedTypes = state.selectedTypes.includes(value) 
            ? state.selectedTypes.filter(t => t !== value) 
            : [...state.selectedTypes, value];
          renderTypeFilters();
          break;
        case 'device':
          state.selectedDevices = state.selectedDevices.includes(value) 
            ? state.selectedDevices.filter(d => d !== value) 
            : [...state.selectedDevices, value];
          renderDeviceFilters();
          break;
        case 'paradigm':
          state.selectedParadigms = state.selectedParadigms.includes(value) 
            ? state.selectedParadigms.filter(p => p !== value) 
            : [...state.selectedParadigms, value];
          renderParadigmFilters();
          break;
        case 'bciMethod':
          state.selectedBciMethods = state.selectedBciMethods.includes(value) 
            ? state.selectedBciMethods.filter(b => b !== value) 
            : [...state.selectedBciMethods, value];
          renderBciMethodFilters();
          break;
        case 'mlMethod':
          state.selectedMlMethods = state.selectedMlMethods.includes(value) 
            ? state.selectedMlMethods.filter(m => m !== value) 
            : [...state.selectedMlMethods, value];
          renderMlMethodFilters();
          break;
      }
      
      renderResults();
      updateActiveFilters();
    }
    
    // Setup event listeners
    function setupEventListeners() {
      searchInput.addEventListener('input', (e) => {
        state.searchTerm = e.target.value;
        renderResults();
        updateActiveFilters();
      });
      
      clearFiltersBtn.addEventListener('click', () => {
        state.searchTerm = '';
        state.selectedTypes = [];
        state.selectedDevices = [];
        state.selectedParadigms = [];
        state.selectedBciMethods = [];
        state.selectedMlMethods = [];
        
        searchInput.value = '';
        renderTypeFilters();
        renderDeviceFilters();
        renderParadigmFilters();
        renderBciMethodFilters();
        renderMlMethodFilters();
        renderResults();
        updateActiveFilters();
      });
    }
    
    // Make toggleFilter available globally
    window.toggleFilter = toggleFilter;
    
    // Initialize the app
    init();
