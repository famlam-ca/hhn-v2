"use client"

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { trpc } from "@/trpc/react"
import { List } from "@/types"

import { ListForm } from "./list-form"
import { ListItem } from "./list-item"

interface ListContainerProps {
  lists: List[]
  boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result.map((item, index) => ({ ...item, position: index }))
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const { mutate: updateListPosition } =
    trpc.list.updateListPosition.useMutation({
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })

  const { mutate: updateCardPosition } =
    trpc.card.updateCardPosition.useMutation({
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })

  const [orderedLists, setOrderedLists] = useState<List[]>(lists)

  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result
    if (!destination) return

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderedLists, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      )

      setOrderedLists(items)
      updateListPosition({ items, boardId })
    }

    // User moves a card
    if (type === "card") {
      const newOrderedLists = [...orderedLists]

      // Source and destination list
      const sourceList = newOrderedLists.find(
        (list) => list.id === source.droppableId,
      )
      const destList = newOrderedLists.find(
        (list) => list.id === destination.droppableId,
      )

      if (!sourceList || !destList) return

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = []
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        )

        reorderedCards.forEach((card, idx) => {
          card.position = idx
        })

        sourceList.cards = reorderedCards

        setOrderedLists(newOrderedLists)
        updateCardPosition({ items: reorderedCards, boardId })

        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, i) => {
          card.position = i
        })

        // Update the order for each card in the destination list
        destList.cards.forEach((card, i) => {
          card.position = i
        })

        setOrderedLists(newOrderedLists)
        updateCardPosition({ items: destList.cards, boardId })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedLists.map((list, index) => {
              return <ListItem key={list.id} index={index} list={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
