'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, CheckCircle, AlertCircle } from 'lucide-react'
import { Modal, ModalBody, ModalFooter } from './ui/Modal'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { isValidEmail, isValidPhone, trackEvent } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  acceptTerms: boolean
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  acceptTerms?: string
}

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    acceptTerms: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un teléfono válido'
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Real API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ email: data.error || 'Error en el registro' })
        return
      }

      // Track successful registration
      trackEvent('registration_completed', {
        source: 'modal',
        name: formData.name,
        email: formData.email,
        userId: data.user.id
      })
      
      setIsSuccess(true)
      
      // Auto close after success
      setTimeout(() => {
        handleClose()
      }, 3000)
      
    } catch (error) {
      console.error('Registration error:', error)
      // Handle error here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      acceptTerms: false
    })
    setErrors({})
    setIsSubmitting(false)
    setIsSuccess(false)
    onClose()
  }

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSuccess) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={false}
        showCloseButton={false}
      >
        <ModalBody>
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-success-600" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="heading-md text-gray-900 mb-4"
            >
              ¡Felicidades! 🎉
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-6"
            >
              Te has registrado exitosamente para el sorteo de hoy. 
              Recibirás un email de confirmación en breve.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-orange-50 border border-orange-200 rounded-xl p-4"
            >
              <p className="text-orange-800 text-sm font-medium">
                ¡Tu entrada para el sorteo de hoy está confirmada!
                <br />
                Sorteo a las 8:00 PM
              </p>
            </motion.div>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="¡Participa en la Rifa de Hoy!"
      size="md"
    >
      <ModalBody>
        <div className="mb-6">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-primary-50 rounded-xl border border-orange-200">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Premio de Hoy</p>
              <p className="text-sm text-gray-600">iPhone 15 Pro + Accesorios Premium</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nombre Completo"
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            error={errors.name}
            placeholder="Ej: Juan Pérez"
            required
            fullWidth
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            placeholder="Ej: juan@email.com"
            required
            fullWidth
          />

          <Input
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            error={errors.phone}
            placeholder="Ej: +1 555 123 4567"
            required
            fullWidth
          />

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleInputChange('acceptTerms')}
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                Acepto los{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                  términos y condiciones
                </a>{' '}
                y las{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                  reglas del sorteo
                </a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.acceptTerms}
              </p>
            )}
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          onClick={handleSubmit}
          icon={!isSubmitting && <Gift className="w-4 h-4" />}
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar Participación'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}