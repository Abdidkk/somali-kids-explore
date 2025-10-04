import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const primary = "#4CA6FE";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xvgwqojy");

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8">
        <Link to="/" className="text-blue-500 hover:underline">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ color: primary }}>
          Kontakt os
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Har du spørgsmål, brug for support eller vil du bare sige hej? Udfyld formularen eller brug kontaktoplysningerne nedenfor, så svarer vi hurtigst muligt!
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl">
        {/* Kontaktoplysninger */}
        <Card className="bg-blue-50/70 border-0 shadow-lg">
          <CardContent className="flex flex-col gap-6 py-8 px-8">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500 w-6 h-6" />
              <span className="text-base text-gray-700">kontakt@dugsi.dk</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-500 w-6 h-6" />
              <span className="text-base text-gray-700">+45 -- -- -- --</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-500 w-6 h-6" />
              <span className="text-base text-gray-700">Århus, Danmark</span>
            </div>
          </CardContent>
        </Card>
        {/* Kontaktformular */}
        <Card className="border-0 shadow-lg">
          <CardContent className="py-8 px-8">
            {state.succeeded ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-green-600 mb-2">Tak for din besked! 🎉</h3>
                <p className="text-gray-700">Vi vender tilbage hurtigst muligt.</p>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-gray-800 font-medium mb-1">
                    Navn
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Dit navn"
                    className="bg-blue-50 focus:bg-white"
                  />
                  <ValidationError 
                    prefix="Navn" 
                    field="name"
                    errors={state.errors}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="din@email.dk"
                    className="bg-blue-50 focus:bg-white"
                  />
                  <ValidationError 
                    prefix="E-mail" 
                    field="email"
                    errors={state.errors}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-800 font-medium mb-1">
                    Besked
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    placeholder="Hvordan kan vi hjælpe dig?"
                    className="min-h-[90px] bg-blue-50 focus:bg-white"
                  />
                  <ValidationError 
                    prefix="Besked" 
                    field="message"
                    errors={state.errors}
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="mt-1 font-bold bg-blue-500 hover:bg-blue-600"
                  disabled={state.submitting}
                >
                  {state.submitting ? "Sender..." : "Send besked"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
