# HHN

## Bug Fixes

- [x] Team changes to first user team on reload when a different team is selected
- [x] Pricing interval is not setting correctly, but localStorage is
- [ ] On create team, the `team switcher` is not updating
- [ ] Newly created teams have the same plan as previous team

## TODO

### Kanban Board

- [x] Implement Kanban board model in Prisma schema
  - [x] Define `Board`, `Card`, `List`, `CardStatus`, `CardComment`, `Label`, `BoardMember`, and related models
- [x] Create Kanban board UI components
  - [x] Board view
  - [x] Card view
  - [x] Card creation and editing forms
- [x] Integrate Kanban board with backend
  - [x] CRUD operations for boards
  - [x] CRUD operations for teams
  - [x] CRUD operations for cards
  - [ ] Real-time updates using WebSockets or similar technology
- [ ] Implement notifications for card updates
  - [ ] Email notifications
  - [ ] In-app notifications
  - [ ] Push notifications
- [ ] Implement onboarding steps for Kanban board

### General

- [ ] Write documentation for new features
  - [ ] Update README.md
  - [ ] Create user guides for Kanban board and VPS dashboard
- [ ] Analytics (w/ Posthog)
  - [ ] Integrate Posthog SDK into the frontend
  - [ ] Track user interactions and events
  - [ ] Create dashboards to visualize user behavior
  - [ ] Set up alerts for key metrics
- [ ] Error Management (w/ Sentry)
  - [ ] Integrate Sentry SDK into the frontend and backend
  - [ ] Configure Sentry to capture errors and performance issues
  - [ ] Set up alerting for critical errors
  - [ ] Create dashboards to monitor error trends
- [ ] Ratelimiting (w/ Upstash)
  - [ ] Integrate Upstash Redis for rate limiting
  - [ ] Define rate limiting rules for API endpoints
  - [ ] Implement middleware to enforce rate limits
  - [ ] Monitor and adjust rate limits based on usage patterns
