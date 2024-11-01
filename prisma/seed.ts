import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export async function main() {
  const password = await hash("Password1234!", 12)
  const user = await prisma.user.create({
    data: {
      id: "999",
      displayName: "Test User",
      name: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@famlam.ca",
      emailVerified: true,
      password,
      image: "https://github.com/placeholder.png",
      role: "ADMIN",
    },
  })
  const userLimit = await prisma.userLimit.create({
    data: {
      userId: user.id,
      teamCount: 1,
    },
  })
  const userSubscription = await prisma.userSubscription.create({
    data: {
      userId: user.id,
      plan: "BASIC",
      stripeSubscriptionId: "sub_1234567890",
      stripeCustomerId: "cus_1234567890",
      stripePriceId: "price_1234567890",
      stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  })
  const team = await prisma.team.create({
    data: {
      title: "Demo Team",
      imageId: "UYgrVfIhBec",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1617791160505-6f00504e3519?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1617791160505-6f00504e3519?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8\u0026ixlib=rb-4.0.3\u0026q=85",
      imageUsername: "fakurian",
      imageLinkHtml:
        "https://unsplash.com/photos/pink-green-and-blue-abstract-painting-UYgrVfIhBec",
      members: { create: { userId: user.id, role: "OWNER" } },
    },
  })
  const teamLimit = await prisma.teamLimit.create({
    data: {
      teamId: team.id,
      boardCount: 1,
    },
  })
  const board = await prisma.board.create({
    data: {
      title: "Demo Board",
      imageId: "HUiNRjXr-bQ",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8\u0026ixlib=rb-4.0.3\u0026q=85",
      imageUsername: "timothyeberly",
      imageLinkHtml:
        "https://unsplash.com/photos/selective-focus-photography-of-brown-leaves-HUiNRjXr-bQ",
      teamId: team.id,
    },
  })
  const boardAuditLog = await prisma.auditLog.create({
    data: {
      userId: user.id,
      teamId: team.id,
      action: "CREATE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: "BOARD",
      username: user.displayName,
      userImage: user.image!,
    },
  })
  const list1 = await prisma.list.create({
    data: {
      boardId: board.id,
      title: "Demo List 1",
      position: 1,
      cards: {
        create: [
          {
            title: "Demo Card 1",
            description: "Demo Description 1",
            position: 1,
          },
          {
            title: "Demo Card 2",
            description: "Demo Description 2",
            position: 2,
          },
        ],
      },
    },
    include: {
      cards: true,
    },
  })
  const list1AuditLog = await prisma.auditLog.create({
    data: {
      userId: user.id,
      teamId: team.id,
      action: "CREATE",
      entityId: list1.id,
      entityTitle: list1.title,
      entityType: "LIST",
      username: user.displayName,
      userImage: user.image!,
    },
  })
  const list1Card1AuditLog = await prisma.auditLog.create({
    data: {
      userId: user.id,
      teamId: team.id,
      action: "CREATE",
      entityId: list1.cards[0].id,
      entityTitle: list1.cards[0].title,
      entityType: "CARD",
      username: user.displayName,
      userImage: user.image!,
    },
  })
  const list1Card2AuditLog = await prisma.auditLog.create({
    data: {
      userId: user.id,
      teamId: team.id,
      action: "CREATE",
      entityId: list1.cards[1].id,
      entityTitle: list1.cards[1].title,
      entityType: "CARD",
      username: user.displayName,
      userImage: user.image!,
    },
  })
  const list2 = await prisma.list.create({
    data: {
      boardId: board.id,
      title: "Demo List 2",
      position: 2,
      cards: {
        create: [
          {
            title: "Demo Card 3",
            description: "Demo Description 3",
            position: 1,
          },
        ],
      },
    },
    include: {
      cards: true,
    },
  })
  const list2AuditLog = await prisma.auditLog.create({
    data: {
      userId: user.id,
      teamId: team.id,
      action: "CREATE",
      entityId: list2.id,
      entityTitle: list2.title,
      entityType: "LIST",
      username: user.displayName,
      userImage: user.image!,
    },
  })
  const list2Card1AuditLog = await prisma.auditLog.create({
    data: {
      userId: user.id,
      teamId: team.id,
      action: "CREATE",
      entityId: list2.cards[0].id,
      entityTitle: list2.cards[0].title,
      entityType: "CARD",
      username: user.displayName,
      userImage: user.image!,
    },
  })

  console.log({
    user,
    userLimit,
    userSubscription,
    team,
    teamLimit,
    board,
    boardAuditLog,
    list1,
    list1AuditLog,
    list1Card1AuditLog,
    list1Card2AuditLog,
    list2,
    list2AuditLog,
    list2Card1AuditLog,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })
