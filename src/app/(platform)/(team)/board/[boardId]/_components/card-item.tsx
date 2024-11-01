"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"

import { useCardModal } from "@/hooks/use-card-modal"

interface CardItemProps {
  index: number
  card: Card
}

export default function CardItem({ index, card }: CardItemProps) {
  const cardModal = useCardModal()

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(card.id)}
          className="trunacte sahdow-sm rounded-md border-2 border-transparent bg-secondary px-3 py-2 text-sm hover:border-black"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
