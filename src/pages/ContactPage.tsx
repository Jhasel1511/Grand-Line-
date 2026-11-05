import React, { useState, useRef } from 'react';
import { Send, Mail, User, MessageSquare, AlertCircle, Sparkles, CheckCircle2, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState<{ [key in keyof FormState]?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmModalRef = useRef<HTMLDialogElement>(null);
  const { success, info } = useToast();

  // Field Validations
  const validate = (data: FormState): FormErrors => {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
      errors.name = 'El nombre es obligatorio.';
    } else if (data.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Introduce un correo electrónico náutico válido.';
    }

    if (!data.message.trim()) {
      errors.message = 'El mensaje no puede estar vacío.';
    } else if (data.message.trim().length < 10) {
      errors.message = 'El mensaje debe contener al menos 10 caracteres.';
    }

    return errors;
  };

  const errors = validate(formData);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (isValid) {
      setShowConfirmModal(true);
      if (confirmModalRef.current) {
        confirmModalRef.current.showModal();
      }
    }
  };

  const handleFinalSend = () => {
    setIsSubmitting(true);
    if (confirmModalRef.current) {
      confirmModalRef.current.close();
    }
    setShowConfirmModal(false);

    // Simulate sea bottle launch process
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      success('¡Tu mensaje en una botella ha sido arrojado a las corrientes del Grand Line!');
      info('Nota demostrativa: este mensaje ha sido simulado y no ha sido remitido a un servidor real.');
    }, 1200);
  };

  const handleCancelModal = () => {
    if (confirmModalRef.current) {
      confirmModalRef.current.close();
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 border-b border-[#D9A441]/30 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22C7C9] uppercase">
          <Send className="w-4 h-4 text-[#D9A441]" />
          <span>COMUNICACIONES DE ALTA MAR</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-[#2c1a0a] dark:text-[#D9A441] tracking-tight">
          ENVÍA UN MENSAJE EN UNA BOTELLA
        </h1>
        <p className="text-sm sm:text-base text-[#553414] dark:text-[#E9D8B4]/80 max-w-xl mx-auto font-sans">
          Escribe tus palabras en un pergamino sellado con cera y confía en que las olas del mar las lleven a su destino.
        </p>
      </div>

      {/* Parchment Styled Letter Container */}
      <div className="wanted-poster rounded-3xl p-6 sm:p-10 shadow-2xl relative border-4 border-[#754C24]">
        
        {/* Seal stamp header */}
        <div className="flex items-center justify-between border-b-2 border-[#754C24]/30 pb-4 mb-6">
          <span className="font-pirate text-xl text-[#754C24]">
            CORREO PIRATA DE LOS MARES
          </span>
          <span className="text-xs font-mono text-[#754C24] font-bold">
            SELLADO: {new Date().toLocaleDateString('es-ES')}
          </span>
        </div>

        <form onSubmit={handleInitialSubmit} className="space-y-6" noValidate>
          
          {/* Nombre field */}
          <div className="space-y-1.5">
            <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-[#3b240f]">
              Tu Nombre o Alias Pirata *
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-[#754C24]">
                <User className="w-5 h-5" />
              </div>
              <input
                id="name-input"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej. Monkey D. Luffy, Trafalgar Law..."
                className={`w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#faf6ed] text-[#2c1a0a] border-2 font-medium text-sm focus:outline-none transition-colors ${
                  touched.name && errors.name
                    ? 'border-[#B83A3A] bg-red-50/50 focus:border-[#B83A3A]'
                    : 'border-[#754C24]/40 focus:border-[#22C7C9]'
                }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="text-xs font-semibold text-[#B83A3A] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="email-input" className="block text-xs font-bold uppercase tracking-wider text-[#3b240f]">
              Correo Electrónico (Den Den Mushi) *
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-[#754C24]">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email-input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="tu-correo@grandline.com"
                className={`w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#faf6ed] text-[#2c1a0a] border-2 font-medium text-sm focus:outline-none transition-colors ${
                  touched.email && errors.email
                    ? 'border-[#B83A3A] bg-red-50/50 focus:border-[#B83A3A]'
                    : 'border-[#754C24]/40 focus:border-[#22C7C9]'
                }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-xs font-semibold text-[#B83A3A] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Mensaje field */}
          <div className="space-y-1.5">
            <label htmlFor="message-input" className="block text-xs font-bold uppercase tracking-wider text-[#3b240f]">
              Mensaje en el Pergamino *
            </label>
            <div className="relative">
              <textarea
                id="message-input"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe tu mensaje para los forajidos del mar (mínimo 10 caracteres)..."
                className={`w-full p-4 rounded-xl bg-[#faf6ed] text-[#2c1a0a] border-2 font-medium text-sm focus:outline-none transition-colors resize-y ${
                  touched.message && errors.message
                    ? 'border-[#B83A3A] bg-red-50/50 focus:border-[#B83A3A]'
                    : 'border-[#754C24]/40 focus:border-[#22C7C9]'
                }`}
              />
            </div>
            {touched.message && errors.message && (
              <p className="text-xs font-semibold text-[#B83A3A] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Notice of Demo */}
          <div className="p-3.5 rounded-xl bg-[#754C24]/10 border border-[#754C24]/30 text-xs text-[#553414] leading-relaxed">
            <strong>Aviso de travesía:</strong> Esta aplicación funciona como demostración frontend interactiva. Al lanzar la botella no se transmitirá información a ningún servidor backend real.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-[#102E46] hover:bg-[#071B2B] disabled:opacity-40 disabled:cursor-not-allowed text-[#F7FAFC] font-cinzel font-black text-sm tracking-widest shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22C7C9]"
          >
            {isSubmitting ? (
              <span>LANZANDO BOTELLA AL MAR...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#22C7C9]" />
                <span>LANZAR MENSAJE AL MAR</span>
              </>
            )}
          </button>

        </form>

      </div>

      {/* Confirmation Modal */}
      <dialog
        ref={confirmModalRef}
        onCancel={handleCancelModal}
        className="p-0 rounded-2xl bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm max-w-md w-full m-auto shadow-2xl border-0"
      >
        <div className="bg-[#071B2B] text-[#F7FAFC] border-2 border-[#D9A441] rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9A441]/30">
            <h3 className="font-cinzel text-lg font-bold text-[#D9A441]">
              ¿Sellar y arrojar la botella?
            </h3>
            <button
              onClick={handleCancelModal}
              className="text-stone-400 hover:text-white p-1"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#E9D8B4] leading-relaxed">
            Revisa tus datos antes de enviar tu mensaje a las corrientes marinas:
          </p>

          <div className="p-3 rounded-xl bg-[#102E46] border border-[#D9A441]/20 space-y-1.5 text-xs">
            <p><strong>Remitente:</strong> {formData.name}</p>
            <p><strong>Correo:</strong> {formData.email}</p>
            <p className="line-clamp-2"><strong>Mensaje:</strong> "{formData.message}"</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCancelModal}
              type="button"
              className="px-4 py-2 rounded-xl border border-[#D9A441]/40 text-[#E9D8B4] hover:bg-[#102E46] text-xs font-semibold cursor-pointer"
            >
              Seguir editando
            </button>
            <button
              onClick={handleFinalSend}
              type="button"
              className="px-5 py-2 rounded-xl bg-[#22C7C9] hover:bg-[#1bb2b4] text-[#071B2B] text-xs font-bold tracking-wider shadow cursor-pointer"
            >
              Confirmar lanzamiento
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
};
