# HHN v2.0

## TODO

### Kanban Board

- [ ] Implement Kanban board model in Prisma schema
  - [ ] Define `Board`, `Task`, `Column`, `TaskStatus`, `TaskComment`, `Label`, `BoardMember`, and related models
- [ ] Create Kanban board UI components
  - [x] Board view
  - [ ] Task view
  - [ ] Task creation and editing forms
- [ ] Integrate Kanban board with backend
  - [x] CRUD operations for boards
  - [ ] CRUD operations for teams
  - [ ] CRUD operations for tasks
  - [ ] Real-time updates using WebSockets or similar technology
- [ ] Implement notifications for task updates
  - [ ] Email notifications
  - [ ] In-app notifications
  - [ ] Push notifications
- [ ] Implement onboarding steps for Kanban board

### VPS Hosting Dashboard

- [ ] Design VPS hosting dashboard UI
  - [ ] Overview of hosted servers
  - [ ] Server management (start, stop, restart)
  - [ ] Resource monitoring (CPU, RAM, Disk usage)
- [ ] Implement backend for VPS management
  - [ ] API endpoints for server management
  - [ ] Integration with VPS provider's API
- [ ] Create user authentication and authorization for dashboard access
  - [ ] Define roles and permissions (admin, user)
  - [ ] Implement role-based access control

### General

- [ ] Write documentation for new features
  - [ ] Update README.md
  - [ ] Create user guides for Kanban board and VPS dashboard
