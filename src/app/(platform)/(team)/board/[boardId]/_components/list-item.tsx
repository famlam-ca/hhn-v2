"use client"

import { Draggable, Droppable } from "@hello-pangea/dnd"
import { ElementRef, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { List } from "@/types"

import { CardForm } from "./card-form"
import CardItem from "./card-item"
import ListHeader from "./list-header"

interface ListItemProps {
  index: number
  list: List
}

export function ListItem({ index, list }: ListItemProps) {
  const textareaRef = useRef<ElementRef<"textarea">>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="h-full w-[272px] shrink-0 select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-background pb-2 shadow-md"
          >
            <ListHeader list={list} onAddCard={enableEditing} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                    list.cards.length === 0 ? "mt-2" : "mt-0",
                  )}
                >
                  {list.cards.map((card, i) => (
                    <CardItem key={card.id} index={i} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              ref={textareaRef}
              listId={list.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
