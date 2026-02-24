import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, AreaChart, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Target, Zap, DollarSign, TrendingDown, Menu, X, BookOpen, Users2, BarChart3, LineChart as LineChartIcon, Heart } from "lucide-react";

// Dados de crescimento de participação
const growthData = [
  { period: "2025/1", participants: 207, workshops: 12, avgParticipants: 17 },
  { period: "2025/2", participants: 1369, workshops: 28, avgParticipants: 49 },
];

// Dados de participação por temática
const thematicData = [
  { name: "IA em Trabalhos Acadêmicos", participants: 509, color: "#3b82f6" },
  { name: "Gestão do Tempo", participants: 415, color: "#8b5cf6" },
  { name: "Textos Acadêmicos + IA", participants: 377, color: "#ec4899" },
  { name: "Outros Temas", participants: 68, color: "#06b6d4" },
];

// Dados de impacto financeiro
const financialScenarios = [
  {
    name: "Conservador",
    reduction: 0.02,
    color: "#ef4444",
    description: "Redução de 2% na evasão"
  },
  {
    name: "Moderado",
    reduction: 0.04,
    color: "#f59e0b",
    description: "Redução de 4% na evasão"
  },
  {
    name: "Otimista",
    reduction: 0.06,
    color: "#10b981",
    description: "Redução de 6% na evasão"
  },
];

// Dados de Programa de Mentoria (histórico completo)
const mentorshipData = [
  { semester: "2º/2023", mentors: 7, mentees: 14, totalParticipants: 21 },
  { semester: "1º/2024", mentors: 16, mentees: 38, totalParticipants: 54 },
  { semester: "2º/2024", mentors: 29, mentees: 109, totalParticipants: 138 },
  { semester: "1º/2025", mentors: 9, mentees: 21, totalParticipants: 30 },
  { semester: "2º/2025", mentors: 15, mentees: 45, totalParticipants: 60 },
];

// Dados de Stay360
const stay360Data = [
  { semester: "1º/2025", professors: 16, sessions: 1, focus: "Acolhida e Permanência" },
  { semester: "2º/2025", professors: 23, sessions: 2, focus: "Acolhida Acadêmica Expandida" },
];

// Dados de Acolhida Acadêmica de Bolsistas
const welcomeScholarshipData = [
  { year: "2024", students: 133 },
  { year: "2025/1", students: 59 },
  { year: "2025/2", students: 100 },
];

// Dados de Pesquisa
const researchData = [
  { year: 2025, studiesAnalyzed: 15, universitiesIdentified: 45, status: "Em andamento" },
];

const calculateFinancialImpact = (reduction: number) => {
  const totalStudents = 15000;
  const monthlyTuition = 1200;
  const annualTuition = monthlyTuition * 12;
  const cac = 2500;
  const pesaCost = 635000;

  const retainedStudents = Math.floor(totalStudents * reduction);
  const recoveredRevenue = retainedStudents * annualTuition;
  const cacSavings = retainedStudents * cac;
  const totalImpact = recoveredRevenue + cacSavings;
  const roi = ((totalImpact - pesaCost) / pesaCost) * 100;
  const paybackMonths = (pesaCost / totalImpact) * 12;

  return {
    retainedStudents,
    recoveredRevenue,
    cacSavings,
    totalImpact,
    roi,
    paybackMonths,
  };
};

// Dados de projeção de maturidade
const maturityData = [
  {
    year: "2026",
    phase: "Consolidação",
    focus: "Padronização de indicadores",
    coverage: 45,
    maturity: 30,
    description: "Calendário anual, relatórios periódicos, cobertura em momentos críticos"
  },
  {
    year: "2027",
    phase: "Expansão",
    focus: "Ações segmentadas",
    coverage: 65,
    maturity: 50,
    description: "Segmentação por perfil, devolutivas por curso, grupos prioritários"
  },
  {
    year: "2028",
    phase: "Qualificação",
    focus: "Learning Analytics",
    coverage: 85,
    maturity: 75,
    description: "Painéis e alertas, ciclos regulares de análise e intervenção"
  },
  {
    year: "2029",
    phase: "Maturidade",
    focus: "Referência Nacional",
    coverage: 100,
    maturity: 100,
    description: "Série histórica consolidada, impacto comprovado, posicionamento estratégico"
  },
];

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("2029");
  const [selectedScenario, setSelectedScenario] = useState("Moderado");
  const [tuitionValue, setTuitionValue] = useState(1200);
  const [totalStudentsValue, setTotalStudentsValue] = useState(15000);
  const [activeSection, setActiveSection] = useState("estudante");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedPhase = useMemo(() => {
    return maturityData.find(d => d.year === selectedYear);
  }, [selectedYear]);

  const currentScenario = useMemo(() => {
    return financialScenarios.find(s => s.name === selectedScenario);
  }, [selectedScenario]);

  const financialData = useMemo(() => {
    return calculateFinancialImpact(currentScenario?.reduction || 0.04);
  }, [currentScenario]);

  // Dados para gráfico de composição de impacto
  const impactComposition = [
    { name: "Receita Recuperada", value: financialData.recoveredRevenue, color: "#3b82f6" },
    { name: "Economia CAC", value: financialData.cacSavings, color: "#8b5cf6" },
  ];

  // Dados para comparação de cenários
  const scenarioComparison = financialScenarios.map(scenario => {
    const data = calculateFinancialImpact(scenario.reduction);
    return {
      name: scenario.name,
      roi: data.roi,
      impacto: data.totalImpact / 1e6,
      color: scenario.color,
    };
  });

  const menuItems = [
    { id: "estudante", label: "Visão Geral", icon: Zap },
    { id: "overview", label: "Ser Estudante Universitário", icon: BookOpen },
    { id: "mentorship", label: "Programa de Mentoria", icon: Users2 },
    { id: "acolhida", label: "Acolhida Acadêmica", icon: Users },
    { id: "stay360", label: "Stay360", icon: BookOpen },
    { id: "research", label: "Pesquisa", icon: BarChart3 },
    { id: "financial", label: "Impacto Financeiro", icon: DollarSign },
    { id: "acompanhamento", label: "Acompanhamento", icon: BarChart3 },
    { id: "ciencia", label: "Análise Científica", icon: TrendingUp },
    { id: "historias", label: "Histórias de Sucesso", icon: Heart },
    { id: "roadmap", label: "Roadmap 2026-2029", icon: Target },
  ];

  const externalDashboardUrl = "https://8501-iqvglsfjns0hq4qylz31d-ee061de5.us1.manus.computer/#dashboard-de-impacto-financeiro-do-pesa";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Titulo Principal */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 border-b border-blue-800">
        <div className="container text-center">
          <h1 className="text-2xl md:text-3xl font-bold">PESA - UCB</h1>
          <p className="text-sm md:text-base text-blue-100 mt-1">Permanencia Estudantil e Sucesso Academico</p>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">PESA - UCB</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Permanência Estudantil e Sucesso Acadêmico</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <a
              href={externalDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard Financeiro
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <a
              href={externalDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard Financeiro
            </a>
          </div>
        )}
      </header>

      <main className="container py-12">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <>
            {/* Hero Section */}
            <section className="mb-16">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight" style={{textAlign: 'center', color: '#1557f5'}}>
                  Crescimento e Maturidade do <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">PESA</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Visualize a evolução da participação estudantil nas ações de formação estudantil do Setor de Permanência Estudantil e Sucesso Acadêmico.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">1.369 participantes em 2025/2</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-semibold text-purple-900 dark:text-purple-200">+560% de crescimento</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tabs */}
            <Tabs defaultValue="growth" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-fit">
                <TabsTrigger value="growth">Crescimento</TabsTrigger>
                <TabsTrigger value="thematic">Temáticas</TabsTrigger>
                <TabsTrigger value="maturity">Maturidade</TabsTrigger>
                <TabsTrigger value="financial">Impacto</TabsTrigger>
              </TabsList>

              {/* Tab 1: Crescimento */}
              <TabsContent value="growth" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Crescimento Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">+560%</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">De 207 para 1.369 participantes</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Workshops Oferecidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">+133%</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">De 12 para 28 oficinas</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Média por Workshop</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+188%</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">De 17 para 49 participantes</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Evolução de Participação (2025)</CardTitle>
                    <CardDescription>Comparativo entre semestres</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="period" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#f3f4f6"
                          }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="participants" fill="#3b82f6" name="Participantes" />
                        <Line yAxisId="right" type="monotone" dataKey="avgParticipants" stroke="#8b5cf6" name="Média por Workshop" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: Temáticas */}
              <TabsContent value="thematic" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Distribuição por Temática (2025/2)</CardTitle>
                    <CardDescription>Participação em oficinas temáticas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={thematicData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#f3f4f6"
                          }}
                        />
                        <Bar dataKey="participants" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {thematicData.map((item, idx) => (
                    <Card key={idx} className="border-0 shadow-lg">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{item.participants}</p>
                          </div>
                          <div 
                            className="w-12 h-12 rounded-lg opacity-20" 
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 3: Maturidade */}
              <TabsContent value="maturity" className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  {maturityData.map((item) => (
                    <button
                      key={item.year}
                      onClick={() => setSelectedYear(item.year)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedYear === item.year
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {item.year}
                    </button>
                  ))}
                </div>

                {selectedPhase && (
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">{selectedPhase.year} - {selectedPhase.phase}</CardTitle>
                          <CardDescription className="text-base mt-2">{selectedPhase.focus}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600 dark:text-slate-400">Maturidade Institucional</p>
                          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{selectedPhase.maturity}%</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300 mb-4">{selectedPhase.description}</p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Cobertura de Ações</span>
                            <span className="text-slate-600 dark:text-slate-400">{selectedPhase.coverage}%</span>
                          </div>
                          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${selectedPhase.coverage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Jornada de Maturidade (2026-2029)</CardTitle>
                    <CardDescription>Evolução institucional do PESA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={maturityData}>
                        <defs>
                          <linearGradient id="colorMaturity" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#f3f4f6"
                          }}
                          formatter={(value) => `${value}%`}
                        />
                        <Area type="monotone" dataKey="maturity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMaturity)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 4: Impacto Financeiro */}
              <TabsContent value="financial" className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  {financialScenarios.map((scenario) => (
                    <button
                      key={scenario.name}
                      onClick={() => setSelectedScenario(scenario.name)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all text-white shadow-lg`}
                      style={{
                        backgroundColor: selectedScenario === scenario.name ? scenario.color : `${scenario.color}80`,
                        opacity: selectedScenario === scenario.name ? 1 : 0.6,
                      }}
                    >
                      {scenario.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Alunos Retidos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{financialData.retainedStudents}</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Anualmente</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Receita Recuperada
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {(financialData.recoveredRevenue / 1e6).toFixed(2)}M</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mensalidades</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Economia CAC
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {(financialData.cacSavings / 1e6).toFixed(2)}M</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sem nova captação</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        ROI
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{financialData.roi.toFixed(0)}%</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Retorno anual</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Composição do Impacto Financeiro</CardTitle>
                      <CardDescription>Receita vs. Economia CAC</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={impactComposition}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: R$ ${(value / 1e6).toFixed(2)}M`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {impactComposition.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `R$ ${(value / 1e6).toFixed(2)}M`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Comparação de Cenários</CardTitle>
                      <CardDescription>ROI e Impacto Total</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={scenarioComparison}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1f2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                              color: "#f3f4f6"
                            }}
                          />
                          <Legend />
                          <Bar yAxisId="left" dataKey="impacto" fill="#3b82f6" name="Impacto (Milhões R$)" />
                          <Bar yAxisId="right" dataKey="roi" fill="#10b981" name="ROI (%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Ser Estudante Universitário Section */}
        {activeSection === "estudante" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4"></h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">O Setor de Permanência Estudantil e Sucesso Acadêmico (PESA) tem como objetivo criar, consolidar e articular a execução de políticas institucionais para promoção da permanência estudantil visando o sucesso acadêmico.</p>
            </div>

            {/* Apresentação do PESA */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">PESA: Setor Estratégico de Permanência Estudantil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  O PESA tem demonstrado valor institucional com evidências de alcance, monitoramento e impacto potencial. A decisão estratégica agora é <strong>institucionalizar plenamente o setor como unidade de inteligência acadêmica</strong>, com equipe ampliada e função de Learning Analytics.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  O PESA atua como setor de permanência estudantil e sucesso acadêmico com foco na <strong>formação do estudante universitário</strong>. Seu diferencial está em trabalhar a permanência como <strong>política acadêmica estruturante</strong>, e não apenas como resposta a evasão.
                </p>
              </CardContent>
            </Card>

            {/* Comparativo: Permanência como Resposta vs Política Estruturante */}
            <section className="mb-16">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">O Diferencial do PESA</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                  Entenda como o PESA se diferencia ao trabalhar permanência como <strong>política acadêmica estruturante</strong>, e não apenas como resposta a evasão.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Permanência como Resposta */}
                <Card className="border-2 border-red-200 dark:border-red-900/50 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <CardTitle className="text-xl text-red-700 dark:text-red-400">Permanência como Resposta</CardTitle>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-300 font-semibold">Abordagem Tradicional</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-red-600 dark:text-red-400 text-lg">•</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Reativa</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Atua após identificação de risco de evasão</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-600 dark:text-red-400 text-lg">•</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Focada em Sintomas</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Trata problemas imediatos de permanência</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-600 dark:text-red-400 text-lg">•</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Isolada</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Ações desconectadas de políticas acadêmicas</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-600 dark:text-red-400 text-lg">•</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Curto Prazo</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Resultados temporários e limitados</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-600 dark:text-red-400 text-lg">•</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Sem Inteligência</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Decisões baseadas em intuição, não em dados</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Permanência como Política Estruturante */}
                <Card className="border-2 border-emerald-200 dark:border-emerald-900/50 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <CardTitle className="text-xl text-emerald-700 dark:text-emerald-400">Permanência como Política Estruturante</CardTitle>
                    </div>
                    <p className="text-sm text-emerald-600 dark:text-emerald-300 font-semibold">Diferencial do PESA</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Preventiva</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Forma estudantes antes de problemas surgirem</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Focada em Raízes</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Desenvolve competências acadêmicas fundamentais</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Integrada</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Articulada com políticas acadêmicas institucionais</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Longo Prazo</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Impacto sustentável e transformador</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Baseada em Dados</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Learning Analytics e inteligência acadêmica</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Pilares do PESA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Formação Acadêmica */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">Formação Acadêmica Preventiva</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Desenvolvimento de competências essenciais para sucesso acadêmico:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>Gestão do tempo e organização acadêmica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>Estratégias de estudo e aprendizagem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>Leitura e escrita acadêmica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>Avaliação e uso ético da IA</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mentoria e Acolhimento */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Users2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg">Mentoria Universitária</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Suporte personalizado para ingressantes e adaptação à vida acadêmica:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      <span>Acolhimento de estudantes ingressantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      <span>Desenvolvimento de sentimento de pertencimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      <span>Orientação para adaptação acadêmica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      <span>Mentores experientes como referência</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Articulação Intersetorial */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-lg">Articulação Intersetorial</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Integração de setores acadêmicos e de apoio para resposta institucional fortalecida:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                      <span>Coordenação com departamentos acadêmicos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                      <span>Integração com setores de apoio estudantil</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                      <span>Resposta institucional coordenada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                      <span>Fortalecimento de políticas integradas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Monitoramento */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <CardTitle className="text-lg">Monitoramento e Inteligência</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sistema de dados para apoio a decisões estratégicas:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 dark:text-pink-400 mt-1">•</span>
                      <span>Base de dados estruturada de estudantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 dark:text-pink-400 mt-1">•</span>
                      <span>Recortes por perfil e condição de bolsa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 dark:text-pink-400 mt-1">•</span>
                      <span>Avaliação de satisfação institucional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 dark:text-pink-400 mt-1">•</span>
                      <span>Learning Analytics e apoio a decisão</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Visão Futura */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardHeader>
                <CardTitle>Visão Futura: Unidade de Inteligência Acadêmica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  O PESA pretende atuar como uma <strong>unidade de inteligência acadêmica</strong> com capacidade de:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white text-sm font-bold">1</div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Equipe Ampliada</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Profissionais especializados em Learning Analytics e análise de dados</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white text-sm font-bold">2</div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Learning Analytics</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Análise avançada de dados educacionais para insights estratégicos</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white text-sm font-bold">3</div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Apoio Estratégico</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Suporte a tomada de decisão em nível institucional</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white text-sm font-bold">4</div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Políticas Estruturantes</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Consolidação de permanência como política acadêmica institucional</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mentorship Section */}
        {activeSection === "mentorship" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Programa de Mentoria Universitária</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Acompanhamento personalizado para estudantes ingressantes através de mentores experientes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Mentores Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">2º Semestre 2025</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Mentorados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">45</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Acompanhados</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Crescimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+67%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">vs 1º semestre</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Evolução do Programa de Mentoria</CardTitle>
                <CardDescription>Evolução histórica do Programa de Mentoria (2023-2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mentorshipData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="mentors" fill="#3b82f6" name="Mentores" />
                    <Bar dataKey="mentees" fill="#8b5cf6" name="Mentorados" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <CardTitle>Livro: Experiências de Mentoria Universitária Brasil-Colômbia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Lançado em 29 de outubro de 2025, o livro reúne relatos, análises e experiências do Programa de Mentoria Universitária em uma perspectiva binacional.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Organizadores</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Beatriz Brandão de Araújo Novaes</li>
                      <li>• Moema Bragança Bittencourt</li>
                      <li>• Paula Andrea Cataño Giraldo</li>
                      <li>• Paula Maria Trabuco Sousa</li>
                      <li>• Pricila Kohls-Santos</li>
                      <li>• Valdivina Alves Ferreira</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Participantes</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Reitor da UCB</li>
                      <li>• Universidade Católica Luis Amigó (Colômbia)</li>
                      <li>• Pró-Reitoria de Identidade e Missão</li>
                      <li>• Coordenação de Graduação</li>
                      <li>• Mentores e Mentorados</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}


        {/* Acolhida Acadêmica de Bolsistas Section */}
        {activeSection === "acolhida" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Acolhida Acadêmica de Bolsistas</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Programa de integração e acolhimento de estudantes bolsistas na comunidade universitária.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">133</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Estudantes acolhidos</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">2025/1</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">59</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Estudantes acolhidos</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">2025/2</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">100</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Estudantes acolhidos</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Evolução da Acolhida Acadêmica</CardTitle>
                <CardDescription>Participação de bolsistas ao longo do período</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={welcomeScholarshipData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" name="Estudantes Acolhidos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
              <CardHeader>
                <CardTitle>Objetivos da Acolhida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  A Acolhida Acadêmica de Bolsistas é um programa estruturado para integrar estudantes bolsistas à comunidade universitária, facilitando sua adaptação ao ambiente acadêmico e promovendo sentimento de pertencimento.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Atividades Realizadas</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400 mt-1">•</span>
                        <span>Apresentação de setores e serviços universitários</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400 mt-1">•</span>
                        <span>Explicação sobre plano de ensino e estratégias avaliativas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400 mt-1">•</span>
                        <span>Apresentação da estrutura física da universidade</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Impacto Esperado</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400 mt-1">•</span>
                        <span>Redução de evasão entre bolsistas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400 mt-1">•</span>
                        <span>Maior engajamento com a instituição</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-600 dark:text-teal-400 mt-1">•</span>
                        <span>Melhor aproveitamento acadêmico</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stay360 Section */}
        {activeSection === "stay360" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Stay360 - Percurso para a Permanência</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Oficinas colaborativas com professores para fortalecer processos de permanência estudantil.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Professores Capacitados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">23</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">2º Semestre 2025</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sessões Realizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">2</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Em 2025</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Crescimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+44%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">vs 1º semestre</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Evolução do Stay360</CardTitle>
                <CardDescription>Participação de professores ao longo de 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stay360Data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#f3f4f6"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="professors" fill="#3b82f6" name="Professores" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader>
                <CardTitle>Objetivos e Metodologia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-2">1º Semestre 2025</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    Oficina com grupo de professores na Semana Pedagógica, buscando sugestões de processos colaborativos no acompanhamento dos bolsistas. Discussão sobre desafios institucionais e propostas para viabilizar ações de permanência.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-2">2º Semestre 2025</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    Capacitação expandida de professores para orientação em dinâmica universitária, espaços, setores e serviços. Foco em acolhida acadêmica e organização de estudos com pesquisa sobre permanência.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Research Section */}
        {activeSection === "research" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Pesquisa sobre Mentoria Universitária</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Análise de programas de mentoria em universidades brasileiras públicas e privadas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Universidades Identificadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">45</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Com programas de mentoria</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Estados Brasileiros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">15+</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cobertura geográfica</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Em Análise</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dados coletados</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Escopo da Pesquisa</CardTitle>
                <CardDescription>Variáveis analisadas nos programas de mentoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-3">Dimensões Investigadas</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Instituições que ofertam Mentoria Universitária</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Distribuição geográfica por estados brasileiros</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Tipos de programas de mentoria ofertados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>Objetivos e finalidades dos programas</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-3">Variáveis Coletadas</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Sujeitos envolvidos (mentores, mentorados)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Oferecimento de bolsas aos participantes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Links e referências dos programas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span>Modelos e estruturas implementadas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
              <CardHeader>
                <CardTitle>Apresentações Acadêmicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-2">7º Congresso Brasileiro de Psicologia</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    Apresentação de painel sobre Mentoria Universitária realizado pela estudante Andrea Guerra, sob supervisão da professora Beatriz Brandão.
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Conteúdo:</strong> Relato de experiência e revisão narrativa sobre a atuação dos mentores universitários.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Financial Section */}
        {activeSection === "financial" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Impacto Financeiro do PESA</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Análise de ROI e economia gerada pela retenção de estudantes.</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {financialScenarios.map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => setSelectedScenario(scenario.name)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-white shadow-lg`}
                  style={{
                    backgroundColor: selectedScenario === scenario.name ? scenario.color : `${scenario.color}80`,
                    opacity: selectedScenario === scenario.name ? 1 : 0.6,
                  }}
                >
                  {scenario.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Alunos Retidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{financialData.retainedStudents}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Anualmente</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Receita Recuperada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {(financialData.recoveredRevenue / 1e6).toFixed(2)}M</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mensalidades</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Economia CAC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {(financialData.cacSavings / 1e6).toFixed(2)}M</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sem nova captação</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{financialData.roi.toFixed(0)}%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Retorno anual</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Composição do Impacto Financeiro</CardTitle>
                  <CardDescription>Receita vs. Economia CAC</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={impactComposition}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: R$ ${(value / 1e6).toFixed(2)}M`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {impactComposition.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `R$ ${(value / 1e6).toFixed(2)}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Comparação de Cenários</CardTitle>
                  <CardDescription>ROI e Impacto Total</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={scenarioComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#f3f4f6"
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="impacto" fill="#3b82f6" name="Impacto (Milhões R$)" />
                      <Bar yAxisId="right" dataKey="roi" fill="#10b981" name="ROI (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Acompanhamento Section */}
        {activeSection === "acompanhamento" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Acompanhamento da Pesquisa</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Análise de determinantes institucionais e individuais da permanência estudantil e sucesso acadêmico</p>
            </div>

            {/* Metodologia */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">Metodologia da Pesquisa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Tipo de Estudo</p>
                    <p className="text-slate-700 dark:text-slate-300">Quantitativo, descritivo e explicativo-correlacional com delineamento transversal</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Amostra</p>
                    <p className="text-slate-700 dark:text-slate-300">4.404 participantes válidos de cursos de graduação</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Coleta de Dados</p>
                    <p className="text-slate-700 dark:text-slate-300">Questionário online (1º e 2º semestre de 2024)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">Análises Estatísticas</p>
                    <p className="text-slate-700 dark:text-slate-300">Correlação de Spearman, regressão linear e testes t</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Variáveis Analisadas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Variáveis Analisadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Adaptação Acadêmica e Social</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Integração do estudante ao contexto universitário</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Percepção da Qualidade do Curso</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Avaliação da experiência educacional</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Prática Docente</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Metodologias e engajamento dos professores</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Gestão Institucional</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Ambiente e políticas institucionais</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Dedicação aos Estudos</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Engajamento e investimento pessoal</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">•</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Dados Sociodemográficos</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Perfil e contexto dos estudantes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modelo MIPESA */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">Modelo MIPESA</CardTitle>
                <CardDescription>Modelo Integracionista para Permanência Estudantil e Sucesso Acadêmico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  O Modelo MIPESA sintetiza as principais teorias de permanência estudantil (Tinto, Bean, Astin), ajustando-as às particularidades do contexto educacional brasileiro e latino-americano. O modelo considera fatores socioeconômicos, culturais e os múltiplos atores da permanência: estudantes, docentes, gestores e educadores administrativos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Dimensão Acadêmica</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Qualidade do curso, atuação docente e engajamento</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Dimensão Institucional</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Gestão, acolhimento e corresponsabilidade</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Dimensão Individual</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Dedicação, motivação e autonomia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contexto Global */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Contexto Global de Evasão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-3">Estados Unidos (2023)</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Taxa de evasão em calouros:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">18,3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Taxa de reingresso:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">2-3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Conclusão pós-retorno:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">14%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-3">Brasil</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Taxa de reingresso (5 anos):</span>
                        <span className="font-semibold text-slate-900 dark:text-white">9,65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Evasão representa:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">Ruptura definitiva</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Necessidade de:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">Políticas de reengajamento</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráficos de Evolução de Programas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Evolução dos Programas PESA</CardTitle>
                <CardDescription>Crescimento e desenvolvimento dos principais programas de permanência estudantil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Gráfico 1: Evolução da Mentoria */}
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Programa de Mentoria Universitária - Evolução Histórica</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={[
                        { periodo: "2023/2", mentores: 7, mentorados: 14 },
                        { periodo: "2024/1", mentores: 16, mentorados: 38 },
                        { periodo: "2024/2", mentores: 29, mentorados: 109 },
                        { periodo: "2025/1", mentores: 9, mentorados: 21 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="periodo" />
                        <YAxis yAxisId="left" label={{ value: "Mentores", angle: -90, position: "insideLeft" }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: "Mentorados", angle: 90, position: "insideRight" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="mentores" fill="#3b82f6" name="Mentores" />
                        <Line yAxisId="right" type="monotone" dataKey="mentorados" stroke="#10b981" strokeWidth={3} name="Estudantes em Mentoria" />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-4"><strong>Insight:</strong> Crescimento de 314% em mentorados (2023/2 a 2024/2), demonstrando expansão significativa do programa. Pico de 29 mentores em 2024/2 com 109 mentorados.</p>
                  </div>

                  {/* Gráfico 2: Acolhida Acadêmica de Bolsistas */}
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Acolhida Acadêmica de Bolsistas - Evolução 2024-2025</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { periodo: "2024", acolhidos: 133 },
                        { periodo: "2025/1", acolhidos: 59 },
                        { periodo: "2025/2", acolhidos: 100 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="periodo" />
                        <YAxis label={{ value: "Estudantes Acolhidos", angle: -90, position: "insideLeft" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
                        <Legend />
                        <Bar dataKey="acolhidos" fill="#a855f7" name="Estudantes Acolhidos" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-4"><strong>Insight:</strong> Redução de 55% em 2025/1 (59 estudantes), seguida de recuperação de 69% em 2025/2 (100 estudantes), indicando ajuste estratégico e reativação do programa.</p>
                  </div>

                  {/* Gráfico 3: Participação Total em Programas */}
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Participação Total em Programas PESA - Crescimento Acumulado</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={[
                        { periodo: "2023/2", participacao: 14 },
                        { periodo: "2024/1", participacao: 38 },
                        { periodo: "2024/2", participacao: 292 },
                        { periodo: "2025/1", participacao: 80 },
                        { periodo: "2025/2", participacao: 1369 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="periodo" />
                        <YAxis label={{ value: "Total de Participantes", angle: -90, position: "insideLeft" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
                        <Legend />
                        <Area type="monotone" dataKey="participacao" fill="#3b82f6" stroke="#1e40af" name="Total de Participantes" />
                      </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-4"><strong>Insight:</strong> Crescimento extraordinário de 9.671% em participação (2023/2 a 2025/2), passando de 14 para 1.369 participantes. Expansão massiva em 2025/2 com 1.369 participantes, validando a estratégia de escala do PESA.</p>
                  </div>

                  {/* Resumo de Crescimento */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resumo de Crescimento por Programa</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">📈</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Mentoria Universitária</p>
                          <p className="text-slate-600 dark:text-slate-400">Crescimento de 314% em mentorados (2023/2 a 2024/2). Programa consolidado com média de 45 mentorados por período.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">📈</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Acolhida Acadêmica de Bolsistas</p>
                          <p className="text-slate-600 dark:text-slate-400">Média de 97 estudantes acolhidos (2024-2025/2). Programa essencial para suporte a bolsistas, com recuperação de 69% em 2025/2.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">📈</span>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Participação Geral</p>
                          <p className="text-slate-600 dark:text-slate-400">Crescimento exponencial de 9.671% (2023/2 a 2025/2). Expansão massiva em 2025/2 demonstra institucionalização e escala dos programas PESA.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Implicações para o PESA */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30">
              <CardHeader>
                <CardTitle className="text-2xl">Implicações para Programas PESA</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                      <span><strong>Reforçar Pertencimento:</strong> Programas de mentoria e acolhida fortalecem motivação intrínseca (82% concordância em pertencimento)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                      <span><strong>Articulação com Carreira:</strong> Conectar formação acadêmica com oportunidades profissionais (84% motivação por carreira)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                      <span><strong>Envolvimento Familiar:</strong> Programas que incluem famílias aumentam suporte externo (79% apoio familiar)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                      <span><strong>Desenvolvimento Integral:</strong> Equilibrar motivação intrínseca (autorrealização) e extrínseca (oportunidades) para permanência sustentável</span>
                    </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Seção Análise Científica */}
        {activeSection === "ciencia" && (
          <section className="mb-16">
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">Análise Científica</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">Fundamentos baseados em pesquisa com 5.227 estudantes sobre fatores de permanência e sucesso acadêmico</p>
            </div>

            {/* Hierarquia de Fatores */}
            <Card className="border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Hierarquia de Fatores para Adaptação Acadêmica</CardTitle>
                <CardDescription>Correlações identificadas na análise de 5.227 estudantes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={[
                    { fator: "Dedicação\nEstudantil", correlacao: 0.573, tipo: "Comportamental" },
                    { fator: "Atuação\nDocente", correlacao: 0.447, tipo: "Pedagógico" },
                    { fator: "Qualidade\nCurso", correlacao: 0.428, tipo: "Curricular" },
                    { fator: "Gestão\nIES", correlacao: 0.348, tipo: "Institucional" }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="fator" />
                    <YAxis label={{ value: "Correlação (r)", angle: -90, position: "insideLeft" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
                    <Legend />
                    <Bar dataKey="correlacao" fill="#3b82f6" name="Correlação com Adaptação Acadêmica" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-semibold text-slate-900 dark:text-white">🥇 Dedicação Estudantil (r = 0.573)</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Fator comportamental mais importante. Comportamentos específicos são mensuráveis e modificáveis através de programas PESA.</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <p className="font-semibold text-slate-900 dark:text-white">🥈 Atuação Docente (r = 0.447)</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Fator pedagógico. Prática docente influencia significativamente a adaptação acadêmica dos estudantes.</p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <p className="font-semibold text-slate-900 dark:text-white">🥉 Qualidade Curso (r = 0.428)</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Fator curricular. Conteúdo, estrutura e relevância do curso impactam a adaptação acadêmica.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Correlação entre Adaptações */}
            <Card className="border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Correlação entre Adaptação Social e Acadêmica</CardTitle>
                <CardDescription>Relação forte entre os dois tipos de adaptação (r = 0.632, p &lt; 0.001)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">0.632</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Correlação forte entre adaptações</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">p &lt; 0.001 (altamente significativa)</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">Implicação:</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Estudantes que se adaptam bem socialmente tendem a se adaptar bem academicamente, e vice-versa. Programas holísticos são mais efetivos.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                      <p className="font-semibold text-slate-900 dark:text-white mb-3">Padrão Diferenciado:</p>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>✓ <strong>Acadêmica:</strong> Mais dependente de dedicação pessoal</li>
                        <li>✓ <strong>Social:</strong> Mais equilibrada entre fatores institucionais</li>
                        <li>✓ <strong>Ambas:</strong> Influenciadas por qualidade do curso</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">Amostra:</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">5.227 estudantes analisados com 105 variáveis, representando 8 instituições.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top 10 Cursos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Top 10 Cursos - Adaptação Acadêmica</CardTitle>
                <CardDescription>Média de adaptação acadêmica por programa (escala 1-5)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={[
                    { curso: "Jornalismo", media: 4.455, n: 26 },
                    { curso: "Enfermagem", media: 4.438, n: 169 },
                    { curso: "Farmácia", media: 4.333, n: 108 },
                    { curso: "Gastronomia", media: 4.288, n: 64 },
                    { curso: "Medicina", media: 4.268, n: 74 },
                    { curso: "Rel. Internacionais", media: 4.250, n: 155 },
                    { curso: "Matemática", media: 4.182, n: 11 },
                    { curso: "Pedagogia", media: 4.174, n: 91 },
                    { curso: "Odontologia", media: 4.137, n: 420 },
                    { curso: "Eng. Software", media: 4.059, n: 524 }
                  ]} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="curso" type="category" width={140} />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} />
                    <Bar dataKey="media" fill="#10b981" name="Média de Adaptação" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-6"><strong>Nota:</strong> Tamanho da amostra varia por curso (n=11 a n=524). Programas com amostras maiores (Odontologia, Eng. Software) oferecem maior confiabilidade estatística.</p>
              </CardContent>
            </Card>

            {/* Motivação para Permanência */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Motivação para Permanência Estudantil</CardTitle>
                <CardDescription>Análise dos fatores motivacionais que influenciam a decisão de continuar os estudos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Fatores de Motivação para Permanência (Escala 1-5)</h3>
                  <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={[
                      { fator: "Projeto de Vida", media: 4.97 },
                      { fator: "Vocação", media: 4.25 },
                      { fator: "Qualidade do Curso", media: 4.24 },
                      { fator: "Dedicação aos Estudos", media: 4.16 },
                      { fator: "Melhorar Condições Econômicas", media: 4.15 },
                      { fator: "Atuação do Professor", media: 4.13 },
                      { fator: "Ambiente da Instituição", media: 4.12 },
                      { fator: "Valorização Pessoal/Profissional", media: 4.12 },
                      { fator: "Suporte Econômico", media: 4.1 },
                      { fator: "Infraestrutura e Tecnologias", media: 4.05 },
                      { fator: "Convivência com Colegas", media: 3.99 },
                      { fator: "Conciliar Estudos e Trabalho", media: 3.84 },
                      { fator: "Satisfação com Gestão IES", media: 3.83 }
                    ]} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="fator" type="category" width={200} />
                      <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                      <Bar dataKey="media" fill="#f97316" name="Média" />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-4"><strong>Nota:</strong> Escala de 1 a 5, onde 5 = máxima motivação. Projeto de Vida (4.97) é o principal motivador para permanência.</p>
                </div>
              </CardContent>
            </Card>

            {/* Matriz de Correlação com Permanência */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">Matriz de Correlação com Permanência Estudantil</CardTitle>
                <CardDescription>Correlação de Pearson entre fatores e o Fator de Permanência Estudantil (FEP) - Significância p &lt; 0,01</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={[
                      { fator: "Prática Docente", correlacao: 0.778, cor: "#4f46e5" },
                      { fator: "Qualidade do Curso", correlacao: 0.574, cor: "#6366f1" },
                      { fator: "Gestão Institucional", correlacao: 0.576, cor: "#818cf8" },
                      { fator: "Dedicação do Estudante", correlacao: 0.332, cor: "#a5b4fc" }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="fator" />
                      <YAxis domain={[0, 1]} label={{ value: "Correlação de Pearson (r)", angle: -90, position: "insideLeft" }} />
                      <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#f3f4f6" }} formatter={(value) => typeof value === 'number' ? value.toFixed(3) : value} />
                      <Bar dataKey="correlacao" fill="#4f46e5" name="Correlação" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-2">Correlação Forte</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400"><strong>Prática Docente (r=0.778):</strong> Atuação do professor é o fator mais fortemente correlacionado com permanência estudantil</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-2">Correlação Moderada</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400"><strong>Qualidade do Curso (r=0.574) e Gestão Institucional (r=0.576):</strong> Fatores igualmente importantes para permanência</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-lg md:col-span-2">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-2">Implicação Estratégica</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Os programas PESA devem priorizar: (1) Qualificação docente e prática pedagógica; (2) Melhoria contínua da gestão institucional; (3) Fortalecimento da qualidade dos cursos. A dedicação do estudante (r=0.332) é menos correlacionada, sugerindo que fatores institucionais têm maior impacto na permanência.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Historias de Sucesso */}
        {activeSection === "historias" && (
          <main className="space-y-8">
            <section className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight" style={{textAlign: 'center', color: '#1557f5'}}>
                  Historias de Sucesso
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 text-center">
                  Depoimentos de estudantes e mentores que se beneficiaram dos programas PESA
                </p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Depoimentos de Mentorados
                  </CardTitle>
                  <CardDescription>Experiencias de estudantes que receberam mentoria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-l-4 border-orange-500">
                      <p className="text-slate-700 dark:text-slate-300 italic mb-3">"Esse programa ajuda muito, principalmente quem esta comecando do zero. Desde ja eu agradeco."</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">D.R. - Mentorada</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-l-4 border-orange-500">
                      <p className="text-slate-700 dark:text-slate-300 italic mb-3">"Foi incrivel o apoio que minha mentora me deu sempre"</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">R. - Mentorada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Heart className="w-6 h-6 text-blue-500" />
                    Depoimentos de Mentores
                  </CardTitle>
                  <CardDescription>Experiencias de mentores que contribuem para o sucesso dos mentorados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-slate-700 dark:text-slate-300 italic mb-3">"E um excelente programa. Eu so tenho elogios a fazer. Agradeco a oportunidade de ter participado, foi uma honra e um orgulho enorme"</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Mentora</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-slate-700 dark:text-slate-300 italic mb-3">"Acredito muito em vcs e no Programa de Mentoria Universitaria, na necessidade dele."</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Mentor</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-slate-700 dark:text-slate-300 italic mb-3">"Amei fazer parte do programa"</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Mentor</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-slate-700 dark:text-slate-300 italic mb-3">"O projeto e incrivel, e amei contribuir para o crescimento do Programa de Mentoria."</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Mentor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Impacto do Programa de Mentoria 2024.2</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">29</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Mentores Dedicados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">69</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Mentorados Acompanhados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">100%</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Satisfacao Relatada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        )}

        {/* Roadmap 2026-2029 */}
        {activeSection === "roadmap" && (
          <main className="space-y-8">
            <section className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight" style={{textAlign: 'center', color: '#1557f5'}}>
                  Roadmap 2026-2029
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 text-center">
                  Marcos de expansao e consolidacao institucional do PESA
                </p>
              </div>

              {/* Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Jornada de Maturidade Institucional</CardTitle>
                  <CardDescription>Fases de desenvolvimento do PESA como unidade de inteligencia academica</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* 2026 - Consolidacao */}
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                        <div className="w-1 h-24 bg-blue-300 mt-2"></div>
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2026: Consolidacao</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Estabelecimento de estrutura formal e consolidacao de programas existentes</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>✓ Formalizacao do PESA como unidade academica</li>
                          <li>✓ Expansao do Programa de Mentoria para todos os cursos</li>
                          <li>✓ Implementacao de sistema de monitoramento integrado</li>
                          <li>✓ Certificacao de 100 mentores</li>
                        </ul>
                      </div>
                    </div>

                    {/* 2027 - Expansao */}
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                        <div className="w-1 h-24 bg-emerald-300 mt-2"></div>
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2027: Expansao</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Amplificacao de alcance e desenvolvimento de novas iniciativas</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>✓ Lancamento de programa de pares mentores</li>
                          <li>✓ Desenvolvimento de plataforma digital de acompanhamento</li>
                          <li>✓ Criacao de grupos de apoio tematicos</li>
                          <li>✓ Participacao em 5 congressos internacionais</li>
                        </ul>
                      </div>
                    </div>

                    {/* 2028 - Qualificacao */}
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">3</div>
                        <div className="w-1 h-24 bg-purple-300 mt-2"></div>
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2028: Qualificacao</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Aprofundamento de praticas e introducao de Learning Analytics</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>✓ Implementacao de Learning Analytics avancado</li>
                          <li>✓ Publicacao de 3 artigos em periodicos internacionais</li>
                          <li>✓ Desenvolvimento de modelo de intervencao personalizada</li>
                          <li>✓ Certificacao de excelencia em permanencia estudantil</li>
                        </ul>
                      </div>
                    </div>

                    {/* 2029 - Maturidade */}
                    <div className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-lg">4</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2029: Maturidade Institucional</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Consolidacao como centro de referencia em permanencia estudantil</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li>✓ Reconhecimento como centro de excelencia regional</li>
                          <li>✓ Modelo replicavel para outras instituicoes</li>
                          <li>✓ Taxa de permanencia acima de 90%</li>
                          <li>✓ Rede de colaboracao com 20 instituicoes nacionais</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Indicadores de Progresso */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Indicadores de Progresso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                      <p className="font-semibold text-slate-900 dark:text-white mb-3">Cobertura de Programas</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>2026</span>
                            <span className="font-bold">100%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>2027</span>
                            <span className="font-bold">150%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-emerald-600 h-2 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>2028</span>
                            <span className="font-bold">200%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>2029</span>
                            <span className="font-bold">250%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-cyan-600 h-2 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                      <p className="font-semibold text-slate-900 dark:text-white mb-3">Metas Estrategicas</p>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>✓ <strong>Mentores:</strong> 7 (2023) → 150 (2029)</li>
                        <li>✓ <strong>Mentorados:</strong> 14 (2023) → 1.500 (2029)</li>
                        <li>✓ <strong>Publicacoes:</strong> 0 (2025) → 10 (2029)</li>
                        <li>✓ <strong>Permanencia:</strong> 85% (2025) → 92% (2029)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        )}

        {/* Footer Stats */}
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">5.227</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Estudantes Monitorados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">292</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Acolhida Acadêmica Bolsistas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">138</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Estudantes Mentoria</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">100%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Meta 2029</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-3">PESA UCB</h3>
              <p className="text-sm">Permanência Estudantil e Sucesso Acadêmico</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Contato</h3>
              <p className="text-sm">Bloco R - Sala 206</p>
              <p className="text-sm">pesa@ucb.br</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Universidade</h3>
              <p className="text-sm">Universidade Católica de Brasília</p>
              <p className="text-sm">© 2026 - Todos os direitos reservados</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>Dashboard desenvolvido para apresentação estratégica do PESA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
