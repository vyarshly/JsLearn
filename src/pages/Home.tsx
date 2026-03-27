import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Zap, 
  BookOpen, 
  Layout, 
  Trophy, 
  Terminal,
  ChevronRight,
  Star,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { lessons } from '../data/lessons';

export const Home: React.FC = () => {
  const { state } = useApp();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const progress = Math.round((state.completedLessons.length / lessons.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-primary text-xs font-black uppercase tracking-widest mb-8"
          >
            <Zap size={14} fill="currentColor" />
            <span>The Ultimate Learning Experience</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
          >
            MASTER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400">
              JAVASCRIPT
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            A premium, interactive workspace designed for modern developers. 
            Deep dive into DOM, master core concepts, and build a solid React foundation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/topics"
              className="group px-10 py-5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-2xl shadow-primary/40"
            >
              {state.completedLessons.length > 0 ? 'CONTINUE LEARNING' : 'START LEARNING'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            {state.completedLessons.length > 0 ? (
              <Link
                to="/dashboard"
                className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg transition-all border border-slate-800 flex items-center gap-3"
              >
                <Trophy size={20} className="text-yellow-400" />
                VIEW DASHBOARD
              </Link>
            ) : (
              <Link
                to="/topics?category=dom"
                className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg transition-all border border-slate-800 flex items-center gap-3"
              >
                <Terminal size={20} />
                DOM LAB
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Lessons', value: lessons.length, icon: <BookOpen className="text-primary" /> },
            { label: 'Interactive Labs', value: '15+', icon: <Terminal className="text-purple-400" /> },
            { label: 'Quizzes', value: lessons.length, icon: <ShieldCheck className="text-green-400" /> },
            { label: 'Your Progress', value: `${progress}%`, icon: <Trophy className="text-yellow-400" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">WHY JS MASTER?</h2>
          <p className="text-slate-500 font-medium">The most complete learning platform for the modern web.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Workspace",
              desc: "A three-panel learning environment with live code execution and instant feedback.",
              icon: <Layout className="text-primary" />,
              color: "primary"
            },
            {
              title: "Deep DOM Focus",
              desc: "Master the DOM with dedicated labs and real-world manipulation tasks.",
              icon: <Code className="text-purple-400" />,
              color: "purple"
            },
            {
              title: "Progress Tracking",
              desc: "Save your progress, bookmarks, and quiz scores automatically to your browser.",
              icon: <Star className="text-pink-400" />,
              color: "pink"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-slate-900 border border-slate-800 rounded-[40px] relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color === 'primary' ? 'primary' : feature.color + '-500'}/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-${feature.color === 'primary' ? 'primary' : feature.color + '-500'}/10 transition-all`} />
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-primary to-purple-700 rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            READY TO START <br /> YOUR JOURNEY?
          </h2>
          <Link
            to="/topics"
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-primary rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
          >
            GET STARTED NOW
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Layout size={20} className="text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">JS<span className="text-primary">MASTER</span></span>
        </div>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
          Premium Educational Platform • 2026
        </p>
      </footer>
    </div>
  );
};
