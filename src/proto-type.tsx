import React, { useState } from 'react';
import { Search, AlertTriangle, FileText, TrendingUp, CheckCircle, XCircle, Info, Globe, Database, Zap, Download } from 'lucide-react';

const FIAPrototype = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced Mock Database with Real Indian Startup Data
  const fundingDatabase = {
    structured: [
      {
        id: 'fund_001',
        startupName: 'Zepto',
        sector: 'Quick Commerce',
        fundingRound: 'Series F',
        amount: '$665M',
        amountINR: '₹5,500 Cr',
        investors: ['Nexus Venture Partners', 'Glade Brook Capital'],
        date: '2024-08-21',
        valuation: '$3.6B',
        city: 'Mumbai',
        authority: 0.95,
        source: 'Inc42 Database'
      },
      {
        id: 'fund_002',
        startupName: 'Ola Electric',
        sector: 'Electric Vehicles',
        fundingRound: 'IPO',
        amount: '$734M',
        amountINR: '₹6,146 Cr',
        investors: ['Public Markets'],
        date: '2024-08-02',
        valuation: '$4.8B',
        city: 'Bangalore',
        authority: 0.98,
        source: 'BSE Official'
      },
      {
        id: 'fund_003',
        startupName: 'Meesho',
        sector: 'E-commerce',
        fundingRound: 'Series F',
        amount: '$275M',
        amountINR: '₹2,290 Cr',
        investors: ['Fidelity', 'Peak XV Partners'],
        date: '2024-05-15',
        valuation: '$4.9B',
        city: 'Bangalore',
        authority: 0.92,
        source: 'VCCEdge'
      }
    ],
    unstructured: [
      {
        id: 'report_001',
        text: 'Indian startup funding declined 33% YoY in 2024, with total funding at $11.3B across 1,203 deals. Quick commerce and electric vehicles emerged as hot sectors.',
        source: 'Economic Times Annual Report 2024',
        timestamp: '2024-12-15',
        authority: 0.90,
        type: 'market_trend',
        language: 'en'
      },
      {
        id: 'report_002',
        text: 'भारत सरकार ने Startup India Seed Fund Scheme के तहत ₹945 करोड़ का आवंटन किया है। 354 इनक्यूबेटरों को मंजूरी दी गई है।',
        source: 'DPIIT Policy Document',
        timestamp: '2024-11-20',
        authority: 0.95,
        type: 'policy',
        language: 'hi'
      },
      {
        id: 'report_003',
        text: 'Bengaluru accounts for 38% of all startup funding in India, followed by Delhi-NCR at 24% and Mumbai at 18%. Tier-2 cities saw 12% growth.',
        source: 'NASSCOM Startup Report',
        timestamp: '2024-10-08',
        authority: 0.88,
        type: 'geographic_trend',
        language: 'en'
      },
      {
        id: 'report_004',
        text: 'SaaS startups raised $4.2B in 2024, making it the largest funded sector. Average deal size increased to $8.5M from $6.2M in 2023.',
        source: 'Bain & Company India Report',
        timestamp: '2024-09-30',
        authority: 0.91,
        type: 'sector_analysis',
        language: 'en'
      }
    ],
    policies: [
      {
        id: 'policy_001',
        title: 'Startup India Seed Fund Scheme (SISFS)',
        description: 'Provides financial assistance up to ₹20 lakhs as seed funding to startups for proof of concept, prototype development, product trials, and market entry',
        eligibility: 'DPIIT recognized startups, incorporated within 2 years',
        authority: 0.97,
        source: 'Government of India - DPIIT',
        language: 'en'
      },
      {
        id: 'policy_002',
        title: 'Fund of Funds for Startups (FFS)',
        description: '₹10,000 crore corpus to provide funding support to startups through SEBI registered AIFs',
        eligibility: 'Via registered AIFs investing in Indian startups',
        authority: 0.97,
        source: 'SIDBI',
        language: 'en'
      }
    ],
    investors: [
      {
        id: 'inv_001',
        name: 'Peak XV Partners (formerly Sequoia India)',
        type: 'Venture Capital',
        focus: 'Technology, Consumer, SaaS',
        ticketSize: '$1M - $100M',
        portfolio: ['Zomato', 'Razorpay', 'Byju\'s'],
        authority: 0.96
      },
      {
        id: 'inv_002',
        name: 'Accel India',
        type: 'Venture Capital',
        focus: 'Early to Growth Stage',
        ticketSize: '$500K - $50M',
        portfolio: ['Freshworks', 'Swiggy', 'Urban Company'],
        authority: 0.94
      }
    ]
  };

  // Language Support with translations
  const translations = {
    en: {
      title: 'Multilingual Startup Funding Intelligence',
      subtitle: 'RAG-Powered • Indic Language Support • Real-Time Insights',
      searchPlaceholder: 'Ask about funding, investors, or policies (in any language)',
      analyze: 'Analyze',
      analyzing: 'Analyzing...',
      trustScore: 'Trust Score',
      dataPoints: 'Data Points',
      sources: 'Sources',
      fundingInsights: 'Funding Insights',
      policies: 'Policy Support',
      investors: 'Top Investors',
      overview: 'Overview',
      insights: 'Insights',
      evidence: 'Evidence',
      exportReport: 'Export Report'
    },
    hi: {
      title: 'बहुभाषी स्टार्टअप फंडिंग इंटेलिजेंस',
      subtitle: 'RAG-संचालित • भारतीय भाषा समर्थन • वास्तविक समय जानकारी',
      searchPlaceholder: 'फंडिंग, निवेशक या नीतियों के बारे में पूछें',
      analyze: 'विश्लेषण करें',
      analyzing: 'विश्लेषण हो रहा है...',
      trustScore: 'विश्वास स्कोर',
      dataPoints: 'डेटा बिंदु',
      sources: 'स्रोत',
      fundingInsights: 'फंडिंग जानकारी',
      policies: 'नीति समर्थन',
      investors: 'शीर्ष निवेशक',
      overview: 'अवलोकन',
      insights: 'अंतर्दृष्टि',
      evidence: 'साक्ष्य',
      exportReport: 'रिपोर्ट निर्यात करें'
    },
    ta: {
      title: 'பன்மொழி ஸ்டார்ட்அப் நிதி அறிவுத்திறன்',
      subtitle: 'RAG-இயக்கப்படுகிறது • இந்திய மொழி ஆதரவு',
      searchPlaceholder: 'நிதி, முதலீட்டாளர்கள் அல்லது கொள்கைகளைப் பற்றி கேளுங்கள்',
      analyze: 'பகுப்பாய்வு செய்யவும்',
      analyzing: 'பகுப்பாய்வு செய்யப்படுகிறது...',
      trustScore: 'நம்பிக்கை மதிப்பெண்',
      dataPoints: 'தரவு புள்ளிகள்',
      sources: 'ஆதாரங்கள்',
      fundingInsights: 'நிதி நுண்ணறிவு',
      policies: 'கொள்கை ஆதரவு',
      investors: 'முதன்மை முதலீட்டாளர்கள்',
      overview: 'கண்ணோட்டம்',
      insights: 'நுண்ணறிவு',
      evidence: 'சான்றுகள்',
      exportReport: 'அறிக்கையை ஏற்றுமதி செய்யவும்'
    },
    te: {
      title: 'బహుభాషా స్టార్టప్ ఫండింగ్ ఇంటెలిజెన్స్',
      subtitle: 'RAG-శక్తివంతం • భారతీయ భాష మద్దతు',
      searchPlaceholder: 'ఫండింగ్, పెట్టుబడిదారులు లేదా విధానాల గురించి అడగండి',
      analyze: 'విశ్లేషించండి',
      analyzing: 'విశ్లేషిస్తోంది...',
      trustScore: 'విశ్వాస స్కోర్',
      dataPoints: 'డేటా పాయింట్లు',
      sources: 'మూలాలు',
      fundingInsights: 'ఫండింగ్ అంతర్దృష్టులు',
      policies: 'విధాన మద్దతు',
      investors: 'అగ్ర పెట్టుబడిదారులు',
      overview: 'అవలోకనం',
      insights: 'అంతర్దృష్టులు',
      evidence: 'సాక్ష్యం',
      exportReport: 'నివేదికను ఎగుమతి చేయండి'
    }
  };

  const t = translations[language];

  // Enhanced RAG Retrieval with Multilingual Support
  const multilingualRAGRetrieval = (userQuery, queryLang) => {
    // Simulate embedding-based semantic search
    const queryKeywords = userQuery.toLowerCase().split(' ');
    
    // Retrieve structured funding data
    const relevantFunding = fundingDatabase.structured.filter(fund => 
      queryKeywords.some(kw => 
        fund.startupName.toLowerCase().includes(kw) ||
        fund.sector.toLowerCase().includes(kw) ||
        fund.city.toLowerCase().includes(kw)
      )
    );

    // Retrieve unstructured reports (cross-language)
    const relevantReports = fundingDatabase.unstructured.filter(doc =>
      queryKeywords.some(kw => doc.text.toLowerCase().includes(kw)) ||
      (queryLang === 'hi' && doc.language === 'hi')
    );

    // Retrieve relevant policies
    const relevantPolicies = fundingDatabase.policies.filter(policy =>
      queryKeywords.some(kw => 
        policy.title.toLowerCase().includes(kw) ||
        policy.description.toLowerCase().includes(kw)
      )
    );

    // Retrieve relevant investors
    const relevantInvestors = fundingDatabase.investors.filter(inv =>
      queryKeywords.some(kw =>
        inv.name.toLowerCase().includes(kw) ||
        inv.focus.toLowerCase().includes(kw)
      )
    );

    return {
      funding: relevantFunding,
      reports: relevantReports,
      policies: relevantPolicies,
      investors: relevantInvestors,
      totalSources: new Set([
        ...relevantFunding.map(f => f.source),
        ...relevantReports.map(r => r.source),
        ...relevantPolicies.map(p => p.source)
      ]).size
    };
  };

  // Generate actionable insights
  const generateActionableInsights = (retrieved, queryLang) => {
    const insights = [];

    // Funding trend insights
    if (retrieved.funding.length > 0) {
      const totalFunding = retrieved.funding.reduce((sum, f) => {
        const amount = parseFloat(f.amount.replace(/[$M]/g, ''));
        return sum + amount;
      }, 0);

      const avgValuation = retrieved.funding.reduce((sum, f) => {
        const val = parseFloat(f.valuation.replace(/[$B]/g, ''));
        return sum + val;
      }, 0) / retrieved.funding.length;

      insights.push({
        type: 'funding_trend',
        title: queryLang === 'hi' ? 'फंडिंग अवलोकन' : 'Funding Overview',
        data: {
          totalDeals: retrieved.funding.length,
          totalAmount: `$${totalFunding.toFixed(0)}M`,
          avgValuation: `$${avgValuation.toFixed(1)}B`,
          topSector: retrieved.funding[0]?.sector || 'N/A'
        }
      });
    }

    // Policy recommendations
    if (retrieved.policies.length > 0) {
      insights.push({
        type: 'policy_support',
        title: queryLang === 'hi' ? 'लागू नीतियां' : 'Applicable Policies',
        data: retrieved.policies.map(p => ({
          name: p.title,
          support: p.description.substring(0, 100) + '...',
          eligibility: p.eligibility
        }))
      });
    }

    // Investor insights
    if (retrieved.investors.length > 0) {
      insights.push({
        type: 'investor_match',
        title: queryLang === 'hi' ? 'संभावित निवेशक' : 'Potential Investors',
        data: retrieved.investors.map(inv => ({
          name: inv.name,
          focus: inv.focus,
          ticketSize: inv.ticketSize,
          portfolioCount: inv.portfolio.length
        }))
      });
    }

    return insights;
  };

  // Generate multilingual response
  const generateMultilingualResponse = (retrieved, insights, queryLang) => {
    let summary = '';

    if (queryLang === 'hi') {
      summary = `${retrieved.funding.length} प्रासंगिक फंडिंग डील्स मिलीं। ${retrieved.policies.length} नीतियां लागू हैं। ${retrieved.investors.length} संभावित निवेशक पहचाने गए।`;
    } else if (queryLang === 'ta') {
      summary = `${retrieved.funding.length} தொடர்புடைய நிதி ஒப்பந்தங்கள் கண்டறியப்பட்டன। ${retrieved.policies.length} கொள்கைகள் பொருந்தும்।`;
    } else if (queryLang === 'te') {
      summary = `${retrieved.funding.length} సంబంధిత ఫండింగ్ డీల్స్ కనుగొనబడ్డాయి। ${retrieved.policies.length} విధానాలు వర్తిస్తాయి।`;
    } else {
      summary = `Found ${retrieved.funding.length} relevant funding deals, ${retrieved.policies.length} applicable policies, and ${retrieved.investors.length} potential investors.`;
    }

    const trustScore = calculateTrustScore(retrieved);
    const dataPoints = retrieved.funding.length + retrieved.reports.length + retrieved.policies.length;

    return {
      summary,
      insights,
      retrieved,
      trustScore,
      dataPoints,
      language: queryLang
    };
  };

  const calculateTrustScore = (retrieved) => {
    const allDocs = [
      ...retrieved.funding.map(f => f.authority),
      ...retrieved.reports.map(r => r.authority),
      ...retrieved.policies.map(p => p.authority)
    ];

    if (allDocs.length === 0) return 0;
    
    return allDocs.reduce((sum, auth) => sum + auth, 0) / allDocs.length;
  };

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    try {
      // Step 1: RAG Retrieval
      const retrieved = multilingualRAGRetrieval(query, language);
      
      // Step 2: Generate Insights
      const insights = generateActionableInsights(retrieved, language);
      
      // Step 3: Generate Response
      const response = generateMultilingualResponse(retrieved, insights, language);
      
      setResults(response);
      setActiveTab('overview');
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!results) return;
    
    const report = {
      query,
      language,
      timestamp: new Date().toISOString(),
      summary: results.summary,
      trustScore: results.trustScore,
      dataPoints: results.dataPoints,
      insights: results.insights,
      evidence: results.retrieved
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `funding-intelligence-report-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            🇮🇳 {t.title}
          </h1>
          <p className="text-purple-200 text-lg">{t.subtitle}</p>
          
          {/* Language Selector */}
          <div className="mt-4 flex justify-center gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'ta', label: 'தமிழ்' },
              { code: 'te', label: 'తెలుగు' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === lang.code
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'bg-purple-800 bg-opacity-50 text-white hover:bg-opacity-70'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Interface */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!query || loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg"
            >
              <Search className="w-5 h-5" />
              {loading ? t.analyzing : t.analyze}
            </button>
          </div>

          {/* Sample Queries */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try:</span>
            {[
              'quick commerce funding',
              'Bangalore startup trends',
              'सरकारी स्टार्टअप योजनाएं',
              'SaaS investors India'
            ].map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(sample)}
                className="text-sm px-3 py-1 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">{t.trustScore}</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {(results.trustScore * 100).toFixed(0)}%
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{ width: `${results.trustScore * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">{t.dataPoints}</span>
                  <Database className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {results.dataPoints}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Across {results.retrieved.totalSources} sources
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">{t.sources}</span>
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {results.retrieved.totalSources}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={exportReport}
                    className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    {t.exportReport}
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-800">Executive Summary</h2>
              </div>
              <p className="text-gray-700 text-lg">{results.summary}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b">
                {['overview', 'insights', 'evidence'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {t[tab]}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Funding Deals */}
                    {results.retrieved.funding.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Recent Funding Deals</h3>
                        <div className="grid gap-4">
                          {results.retrieved.funding.map(fund => (
                            <div key={fund.id} className="border-2 border-purple-100 rounded-lg p-4 hover:border-purple-300 transition-all">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-800">{fund.startupName}</h4>
                                  <p className="text-sm text-gray-600">{fund.sector} • {fund.city}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-purple-600">{fund.amountINR}</div>
                                  <div className="text-sm text-gray-500">{fund.amount}</div>
                                </div>
                              </div>
                              <div className="flex gap-4 text-sm text-gray-600 mt-3">
                                <span>Round: <strong>{fund.fundingRound}</strong></span>
                                <span>Valuation: <strong>{fund.valuation}</strong></span>
                                <span>Date: <strong>{fund.date}</strong></span>
                              </div>
                              <div className="mt-2 text-sm">
                                <span className="text-gray-600">Investors: </span>
                                {fund.investors.map((inv, idx) => (
                                  <span key={idx} className="text-purple-600 font-medium">
                                    {inv}{idx < fund.investors.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'insights' && (
                  <div className="space-y-6">
                    {results.insights.map((insight, idx) => (
                      <div key={idx} className="border-2 border-blue-100 rounded-lg p-5">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          {insight.title}
                        </h3>
                        
                        {insight.type === 'funding_trend' && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-sm text-gray-600">Total Deals</div>
                              <div className="text-2xl font-bold text-blue-600">{insight.data.totalDeals}</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="text-sm text-gray-600">Total Amount</div>
                              <div className="text-2xl font-bold text-green-600">{insight.data.totalAmount}</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-3">
                              <div className="text-sm text-gray-600">Avg Valuation</div>
                              <div className="text-2xl font-bold text-purple-600">{insight.data.avgValuation}</div>
                            </div>
                            <div className="bg-pink-50 rounded-lg p-3">
                              <div className="text-sm text-gray-600">Top Sector</div>
                              <div className="text-lg font-bold text-pink-600">{insight.data.topSector}</div>
                            </div>
                          </div>
                        )}

                        {insight.type === 'policy_support' && (
                          <div className="space-y-3">
                            {insight.data.map((policy, pidx) => (
                              <div key={pidx} className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-bold text-green-800 mb-1">{policy.name}</h4>
                                <p className="text-sm text-gray-700 mb-2">{policy.support}</p>
                                <p className="text-xs text-gray-600"><strong>Eligibility:</strong> {policy.eligibility}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {insight.type === 'investor_match' && (
                          <div className="space-y-3">
                            {insight.data.map((inv, iidx) => (
                              <div key={iidx} className="bg-purple-50 rounded-lg p-4">
                                <h4 className="font-bold text-purple-800 mb-2">{inv.name}</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-gray-600">Focus: </span>
                                    <span className="font-medium">{inv.focus}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Ticket Size: </span>
                                    <span className="font-medium">{inv.ticketSize}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Portfolio: </span>
                                    <span className="font-medium">{inv.portfolioCount} companies</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'evidence' && (
                  <div className="space-y-4">
                    {results.retrieved.reports.map(doc => (
                      <div key={doc.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-800">{doc.source}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                              Authority: {(doc.authority * 100).toFixed(0)}%
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {doc.language.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">{doc.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{doc.text}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          Type: {doc.type.replace(/_/g, ' ')}
                        </div>
                      </div>
                    ))}

                    {results.retrieved.policies.map(policy => (
                      <div key={policy.id} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-green-800">{policy.title}</h4>
                          <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded font-medium">
                            Policy • {(policy.authority * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{policy.description}</p>
                        <p className="text-xs text-gray-600">
                          <strong>Eligibility:</strong> {policy.eligibility}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Source: {policy.source}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-12 text-center">
            <Globe className="w-20 h-20 mx-auto mb-6 text-purple-300" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Query Real Indian Startup Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">✅ Real Data Included</h4>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• Zepto, Ola Electric, Meesho funding</li>
                  <li>• Government schemes (SISFS, FFS)</li>
                  <li>• Top VCs: Peak XV, Accel</li>
                  <li>• Market trends & reports</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">🌐 Multilingual</h4>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• English, हिंदी, தமிழ், తెలుగు</li>
                  <li>• Cross-language retrieval</li>
                  <li>• Policy docs in native languages</li>
                  <li>• Export reports in any language</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FIAPrototype;