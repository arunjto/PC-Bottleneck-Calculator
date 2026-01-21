'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, User, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/sonner';

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
  (process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
    ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`
    : '');
const FORMSPREE_REDIRECT =
  process.env.NEXT_PUBLIC_FORMSPREE_REDIRECT_URL && process.env.NEXT_PUBLIC_FORMSPREE_REDIRECT_URL.trim() !== ''
    ? process.env.NEXT_PUBLIC_FORMSPREE_REDIRECT_URL
    : '/thank-you';

export function ContactForm({ dict }: { dict: any }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!dict) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      toast({
        title: 'Form configuration missing',
        description: 'Please configure NEXT_PUBLIC_FORMSPREE_FORM_ID in your environment.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || dict.form.subjects?.general || 'General Inquiry',
          message: formData.message,
          _gotcha: honeypotValue,
          _redirect: FORMSPREE_REDIRECT || undefined,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          result?.errors?.[0]?.message ||
          result?.error ||
          result?.error ||
          dict.form.error_desc;
        throw new Error(errorMessage);
      }

      toast({
        title: dict.form.success_title,
        description: dict.form.success_desc,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setHoneypotValue('');

      if (FORMSPREE_REDIRECT) {
        window.location.assign(FORMSPREE_REDIRECT);
        return;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : dict.form.error_desc;
      toast({
        title: dict.form.error_title,
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {dict.form.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Formspree honeypot for spam protection */}
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="company" className="sr-only">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotValue}
                    onChange={(event) => setHoneypotValue(event.target.value)}
                    aria-hidden="true"
                  />
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name">{dict.form.name}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={dict.form.name_ph}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">{dict.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={dict.form.email_ph}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject">{dict.form.subject}</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleChange('subject', value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder={dict.form.subject_ph} />
                    </SelectTrigger>
                    <SelectContent>
                      {dict.form.subjects && Object.entries(dict.form.subjects).map(([key, value]) => (
                        <SelectItem key={key} value={value as string}>
                          {value as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">{dict.form.message}</Label>
                  <Textarea
                    id="message"
                    placeholder={dict.form.message_ph}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? dict.form.sending : dict.form.button}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">{dict.info.email_title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dict.info.email_desc}
                  </p>
                  <a
                    href="mailto:rekhareet07@gmail.com"
                    className="text-primary hover:underline font-medium"
                  >
                    rekhareet07@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: dict.info.response_time }} />
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
}
