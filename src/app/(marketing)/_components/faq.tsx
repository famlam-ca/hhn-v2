"use client"

import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/constants/faq-items"

import { fadeIn } from "./cta-section"

export function FAQ() {
  const midpoint = Math.ceil(FAQ_ITEMS.length / 2)

  return (
    <section id="faq">
      <div className="grid w-full grid-cols-1 gap-x-8 sm:grid-cols-2">
        <Accordion type="single" collapsible defaultValue="item-1">
          {FAQ_ITEMS.slice(0, midpoint).map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
            >
              <AccordionItem value={item.id}>
                <AccordionTrigger>
                  <p>
                    <span className="mr-2">{item.icon}</span>
                    {item.question}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
        <Accordion
          type="single"
          collapsible
          defaultValue={FAQ_ITEMS[midpoint].id}
        >
          {FAQ_ITEMS.slice(midpoint).map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
            >
              <AccordionItem value={item.id}>
                <AccordionTrigger>
                  <p>
                    <span className="mr-2">{item.icon}</span>
                    {item.question}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
