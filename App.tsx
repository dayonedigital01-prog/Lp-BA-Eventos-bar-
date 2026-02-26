
import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  Star,
  Quote,
  Instagram,
  Facebook,
  GlassWater,
  Award,
  Zap
} from 'lucide-react';
import { LeadData } from './types';

// Componentes Reutilizáveis
const TestimonialCard: React.FC<{ name: string; event: string; text: string }> = ({ name, event, text }) => (
  <div className="bg-stone-900/50 p-8 rounded-[2rem] border border-stone-800 relative transition-all hover:border-amber-500/30 hover:bg-stone-900 group">
    <div className="flex items-center gap-1 text-amber-500 mb-4">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
    </div>
    <p className="text-stone-300 mb-6 italic leading-relaxed text-lg font-light">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold shadow-lg">
        {name[0]}
      </div>
      <div>
        <h4 className="text-white font-bold">{name}</h4>
        <p className="text-amber-500/70 text-[10px] uppercase tracking-widest font-bold">{event}</p>
      </div>
    </div>
  </div>
);

const ExperienceCard: React.FC<{ name: string; img: string; desc: string }> = ({ name, img, desc }) => (
  <div className="group relative overflow-hidden rounded-[2.5rem] bg-stone-900 border border-stone-800 aspect-[4/5]">
    <img 
      src={`${img}?auto=format&fit=crop&q=80&w=600`} 
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
      alt={`Bartender uniformizado preparando ${name}`} 
      loading="lazy"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <p className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">A Experiência</p>
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  </div>
);

const BALogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className="relative w-16 h-16 mb-2">
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <path d="M60 10 L85 35 L65 40 Z" fill="#4ade80" /> 
        <line x1="68" y1="28" x2="62" y2="45" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="65" cy="45" r="12" fill="#fbbf24" />
        <circle cx="65" cy="45" r="9" fill="none" stroke="#92400e" strokeWidth="0.5" />
        <path d="M25 35 L75 35 L50 65 Z" fill="#67e8f9" opacity="0.8" />
        <path d="M40 45 L60 45 L50 58 Z" fill="#ef4444" />
        <line x1="50" y1="65" x2="50" y2="85" stroke="#67e8f9" strokeWidth="3" />
        <path d="M35 85 L65 85" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <path d="M25 30 L45 50" stroke="#fbbf24" strokeWidth="3" fill="none" />
        <path d="M25 30 L15 35" stroke="#fbbf24" strokeWidth="3" fill="none" />
      </svg>
    </div>
    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl font-bold text-white tracking-tighter">BA</span>
        <div className="h-6 w-px bg-amber-500 mx-1"></div>
        <span className="text-xl font-serif font-bold text-amber-500 uppercase tracking-widest">Eventos</span>
      </div>
      <p className="text-[8px] uppercase tracking-[0.2em] text-amber-400 mt-1 font-bold">Bar e Coquetelaria</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    whatsapp: '',
    location: '',
    guests: 0,
    date: '',
    eventType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? parseInt(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio (sem IA conforme solicitado)
    setTimeout(() => {
      setAiResponse("Recebemos seu pedido com sucesso! Nossa equipe já está polindo os cristais para o seu grande dia. Clique no botão abaixo para finalizarmos os detalhes via WhatsApp.");
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleWhatsAppRedirect = () => {
    const ownerNumber = "5544998633217";
    const message = encodeURIComponent(
      `Olá! Acabei de solicitar um orçamento no site e estou ansioso por um brinde épico!\n\n` +
      `*Meus dados:* \n` +
      `- *Nome:* ${formData.name}\n` +
      `- *Tipo de Evento:* ${formData.eventType}\n` +
      `- *Local:* ${formData.location}\n` +
      `- *Convidados:* ${formData.guests}\n` +
      `- *Data:* ${formData.date}\n` +
      `- *Contato:* ${formData.whatsapp}\n\n` +
      `Podemos conversar sobre a proposta?`
    );
    window.open(`https://wa.me/${ownerNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen selection:bg-amber-500 selection:text-stone-950 bg-stone-950 overflow-x-hidden font-sans text-stone-100">
      {/* Navegação */}
      <nav className="fixed top-0 w-full z-50 bg-stone-950/90 backdrop-blur-xl border-b border-stone-900">
        <div className="max-w-7xl mx-auto px-6 h-24 grid grid-cols-3 items-center">
          <div className="hidden md:flex items-center gap-10 text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">
            <a href="#experiencia" className="hover:text-amber-500 transition-colors">A Arte</a>
            <a href="#cardapio" className="hover:text-amber-500 transition-colors">O Bar</a>
            <a href="#provas" className="hover:text-amber-500 transition-colors">Relatos</a>
          </div>
          
          <div className="flex justify-center">
            <BALogo className="scale-75" />
          </div>

          <div className="flex justify-end">
            <button 
              onClick={scrollToForm}
              className="bg-white text-stone-950 px-8 py-3 rounded-full hover:bg-amber-500 transition-all hover:scale-105 active:scale-95 shadow-lg font-bold"
            >
              Pedir Proposta
            </button>
          </div>
        </div>
      </nav>

      {/* Seção Hero */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1600" 
            className="w-full h-full object-cover opacity-30"
            alt="Bartender profissional em Maringá"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-[0.3em]">
              <Zap size={14} /> Mixologia de Elite em Maringá
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.2] text-white tracking-tighter">
              Redescubra o prazer <br />
              <span className="text-amber-500 italic">de beber</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-stone-200 max-w-xl mx-auto leading-relaxed font-light">
              Transformamos seu evento com um bar de alto padrão, estrutura própria e drinks autorais impecáveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <button 
                onClick={scrollToForm}
                className="group bg-amber-600 hover:bg-amber-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-amber-600/30 flex items-center justify-center gap-3"
              >
                <span>Fazer Orçamento</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4 bg-stone-900/40 p-4 rounded-2xl border border-stone-800">
                <div className="flex -space-x-2">
                  {[10,20,30,40].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} className="w-10 h-10 rounded-full border-2 border-stone-950" alt="Cliente satisfeito" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Favorito de</p>
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">+1.200 Anfitriões</p>
                </div>
              </div>
            </div>
          </div>

          {/* Caixa do Formulário */}
          <div ref={formRef} className="bg-stone-900/60 backdrop-blur-3xl p-10 lg:p-14 rounded-[3.5rem] border border-stone-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]"></div>
            
            {isSuccess ? (
              <div className="text-center py-10 space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30 shadow-2xl">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">VAI SER ÉPICO!</h2>
                <div className="bg-stone-950/80 p-8 rounded-[2rem] border border-stone-800 text-stone-200 italic text-lg leading-relaxed text-left relative shadow-inner">
                  <Quote className="absolute -top-4 -left-4 text-amber-500/20" size={40} />
                  {aiResponse}
                </div>
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-green-900/20"
                >
                  <MessageSquare /> Finalizar via WhatsApp
                </button>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Clique no botão para nos enviar os detalhes!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold text-white mb-3 uppercase tracking-tighter">Inicie seu brinde</h2>
                  <p className="text-stone-400 font-medium italic">O bar que Maringá sempre sonhou.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      name="name"
                      placeholder="Seu Nome" 
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-2xl py-5 px-6 text-stone-100 focus:outline-none focus:border-amber-500 transition-all placeholder:text-stone-600"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <input 
                      required
                      type="tel" 
                      name="whatsapp"
                      placeholder="Seu Whats (DDD)" 
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-2xl py-5 px-6 text-stone-100 focus:outline-none focus:border-amber-500 transition-all placeholder:text-stone-600"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                    />
                  </div>

                  <input 
                    required
                    type="text" 
                    name="location"
                    placeholder="Cidade do Evento" 
                    className="w-full bg-stone-950/50 border border-stone-800 rounded-2xl py-5 px-6 text-stone-100 focus:outline-none focus:border-amber-500 transition-all placeholder:text-stone-600"
                    value={formData.location}
                    onChange={handleInputChange}
                  />

                  <select
                    required
                    name="eventType"
                    className={`w-full bg-stone-950/50 border border-stone-800 rounded-2xl py-5 px-6 focus:outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer ${formData.eventType ? 'text-stone-100' : 'text-stone-600'}`}
                    value={formData.eventType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled className="text-stone-600">Tipo de Evento</option>
                    <option value="Casamento" className="bg-stone-900">Casamento</option>
                    <option value="Aniversário" className="bg-stone-900">Aniversário</option>
                    <option value="Corporativo" className="bg-stone-900">Corporativo</option>
                    <option value="Formatura" className="bg-stone-900">Formatura</option>
                    <option value="Outros" className="bg-stone-900">Outros</option>
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="number" 
                      name="guests"
                      placeholder="Convidados" 
                      min="1"
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-2xl py-5 px-6 text-stone-100 focus:outline-none focus:border-amber-500 transition-all placeholder:text-stone-600"
                      value={formData.guests || ''}
                      onChange={handleInputChange}
                    />
                    <input 
                      required
                      type="date" 
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-2xl py-5 px-6 text-stone-100 focus:outline-none focus:border-amber-500 transition-all text-stone-400"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-white hover:bg-amber-500 text-stone-950 py-6 rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-stone-200 border-t-stone-950 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>SOLICITAR ORÇAMENTO</span>
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Grid de Experiência */}
      <section id="cardapio" className="py-32 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-7xl font-bold text-white tracking-tighter uppercase">Nossa <span className="text-amber-500 italic">Arte</span></h2>
            <p className="text-stone-400 text-xl max-w-2xl mx-auto font-light">Equipe uniformizada e estrutura modular que se adapta perfeitamente ao seu cenário.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ExperienceCard 
              name="O Preparo" 
              img="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b"
              desc="Mixologia técnica executada por profissionais que entendem de sabor e equilíbrio em cada gota."
            />
            <ExperienceCard 
              name="O Agito" 
              img="https://images.unsplash.com/photo-1536935338788-846bb9981813"
              desc="A vibração do preparo ao vivo. Nossos bartenders trazem dinamismo e entretenimento para o seu bar."
            />
            <ExperienceCard 
              name="A Elegância" 
              img="https://images.unsplash.com/photo-1575444758702-4a6b9222336e"
              desc="Bartenders rigorosamente uniformizados e treinados para um serviço de classe mundial em qualquer ocasião."
            />
            <ExperienceCard 
              name="A Guarnição" 
              img="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d"
              desc="Estética impecável. Utilizamos insumos selecionados e finalizações que tornam cada drink uma obra de arte."
            />
            <ExperienceCard 
              name="A Chama" 
              img="https://images.unsplash.com/photo-1574096079513-d8259312b785"
              desc="Técnicas avançadas de aromatização e defumação para surpreender os paladares mais exigentes."
            />
            <ExperienceCard 
              name="O Visual" 
              img="https://images.unsplash.com/photo-1470337458703-46ad1756a187"
              desc="Mobiliário e decoração própria. Montamos um bar completo que complementa a estética do seu evento."
            />
             <ExperienceCard 
              name="A Atitude" 
              img="https://images.unsplash.com/photo-1510626176961-4b57d4fbad03"
              desc="Hospitalidade é o nosso DNA. Atendimento focado no acolhimento e na satisfação total de cada convidado."
            />
            <ExperienceCard 
              name="O Brinde" 
              img="https://images.unsplash.com/photo-1556679343-c7306c1976bc"
              desc="Excelência do início ao fim. Sua única preocupação será aproveitar a festa e celebrar os bons momentos."
            />
          </div>
        </div>
      </section>

      {/* Seção de Diferenciais */}
      <section id="experiencia" className="py-24 border-y border-stone-900 bg-stone-900/20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2 border border-amber-500/20">
              <Award size={36} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Uniforme & Postura</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">Equipe profissional com vestimenta impecável, garantindo a elegância do seu evento.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2 border border-amber-500/20">
              <Zap size={36} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Show de Mixologia</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">Preparo técnico e visual que transforma o bar em um dos grandes destaques da noite.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2 border border-amber-500/20">
              <GlassWater size={36} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Estrutura & Decoração</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">Oferecemos balcões modulares e decoração própria, prontos para qualquer ambiente.</p>
          </div>
        </div>
      </section>

      {/* Seção de Prova Social */}
      <section id="provas" className="py-32 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 text-center md:text-left">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-5xl sm:text-6xl font-bold uppercase tracking-tighter text-white">Relatos de <span className="text-amber-500 italic">Brindes Épicos</span></h2>
              <p className="text-stone-400 text-xl font-light italic">O que Maringá e região comentam após uma noite com a BA Eventos.</p>
            </div>
            <div className="bg-stone-950 p-8 rounded-3xl border border-stone-800 text-center mx-auto md:mx-0 min-w-[200px] shadow-2xl">
              <p className="text-6xl font-bold text-amber-500 tracking-tighter">4.9</p>
              <div className="flex justify-center text-amber-500 my-2"><Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /></div>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold">Nota nas Avaliações</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <TestimonialCard 
              name="Vanessa Oliveira"
              event="Casamento no Luz de Lua"
              text="Gente, o que foi aquele bar? Meu casamento parou pra ver os meninos preparando os drinks. Os bartenders uniformizados trouxeram uma sofisticação incrível. Atendimento nota mil!"
            />
            <TestimonialCard 
              name="Davi Camargo"
              event="Aniversário de 30 Anos"
              text="Chamei pro meu niver e foi a melhor coisa que fiz. A estrutura de decoração própria deles é linda e chamou muito a atenção. Equipe nota 10, energia lá no teto!"
            />
            <TestimonialCard 
              name="Priscila M."
              event="Noivado em Maringá"
              text="Fiquei chocada com a beleza do bar. Os copos de cristal, a decoração impecável... parecia coisa de filme. Meus convidados amaram o atendimento e os drinks impecáveis."
            />
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-stone-950 border-t border-stone-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-24 text-center md:text-left">
            <BALogo className="scale-125" />
            <div className="flex gap-12 text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              <a href="https://www.instagram.com/baeventosbar/?hl=pt-br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-500 transition-colors group" aria-label="Siga-nos no Instagram">
                <Instagram size={20} className="group-hover:rotate-12 transition-transform" /> 
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-amber-500 transition-colors group" aria-label="Curta-nos no Facebook">
                <Facebook size={20} className="group-hover:rotate-12 transition-transform" /> 
                <span>Facebook</span>
              </a>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-20 pt-24 border-t border-stone-900">
            <div className="space-y-8 text-center sm:text-left">
              <h4 className="text-white font-bold text-lg uppercase tracking-widest">Localização</h4>
              <p className="text-stone-400 leading-relaxed text-sm">Base Central: Maringá - PR<br />Atendimento exclusivo em todo o Norte Paranaense.</p>
            </div>
            <div className="space-y-8 text-center sm:text-left">
              <h4 className="text-white font-bold text-lg uppercase tracking-widest">Datas & Orçamentos</h4>
              <p className="text-stone-400 text-sm">Propostas via WhatsApp em até 24h.</p>
            </div>
            <div className="space-y-8 text-center sm:text-left">
              <h4 className="text-white font-bold text-lg uppercase tracking-widest text-amber-500">A Nossa Essência</h4>
              <p className="text-stone-400 text-sm italic leading-relaxed">"Criamos o cenário perfeito para que sua única tarefa seja celebrar. Estrutura própria e arte coqueteleira de alto nível."</p>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-stone-700 uppercase tracking-[0.2em] font-bold text-center">
            <p>© 2024 BA Eventos. Elevando o padrão de brindes em Maringá.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-stone-400 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-stone-400 transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CTA Mobile */}
      <div className="fixed bottom-10 right-8 z-50 md:hidden">
        <button 
          onClick={scrollToForm}
          className="bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-bounce"
          aria-label="Solicitar orçamento agora"
        >
          <Calendar size={28} />
        </button>
      </div>
    </div>
  );
};

export default App;
