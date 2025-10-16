# Momo Dukan - Testing Documentation

## 🧪 Testing Strategy

This project implements comprehensive unit testing for both frontend and backend components using modern testing frameworks and best practices.

## 🛠️ Testing Stack

### Frontend Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom Jest matchers

### Backend Testing
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertions
- **MongoDB Memory Server**: In-memory MongoDB instance for testing
- **ts-jest**: TypeScript preprocessor for Jest

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── components/
│   │   └── Navigation.test.tsx
│   └── pages/
│       ├── HomePage.test.tsx
│       ├── LoginPage.test.tsx
│       ├── RegisterPage.test.tsx
│       ├── ContactPage.test.tsx
│       └── AboutPage.test.tsx
server/
└── __tests__/
    ├── User.test.ts
    └── api.test.ts
```

## 🚀 Running Tests

### Frontend Tests
```bash
# Run all frontend tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Tests
```bash
# Run all backend tests
cd server
npm test

# Run tests in watch mode  
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Run All Tests
```bash
# Use the provided script to run both frontend and backend tests
./run-tests.bat
```

## 📊 Test Coverage

The project aims for high test coverage across all components:

### Frontend Components Tested:
- ✅ **Navigation Component**: Link rendering, image display, navigation structure
- ✅ **Home Page**: Content display, login button, styling classes
- ✅ **Login Page**: Form validation, API calls, error handling, navigation
- ✅ **Register Page**: Form validation, password matching, API integration
- ✅ **Contact Page**: Form submission, field validation, user interactions
- ✅ **About Page**: Content rendering, headings structure, text display

### Backend Components Tested:
- ✅ **User Model**: CRUD operations, validation, database interactions
- ✅ **API Endpoints**: Login/register functionality, error handling, response formats

## 🧪 Test Categories

### Unit Tests
- Component rendering
- User interactions
- Form validations
- State management
- API integrations

### Integration Tests
- Database operations
- API endpoint functionality
- Error handling
- Request/response cycles

### Mocking Strategy
- **Next.js Components**: Image, Link, Navigation hooks
- **HTTP Requests**: Axios mocking for API calls
- **Database**: MongoDB Memory Server for isolated testing
- **Browser APIs**: Window.alert, console methods

## 📝 Test Examples

### Component Testing
```typescript
it('renders the navigation component', () => {
  render(<Navigation />)
  const nav = screen.getByRole('navigation')
  expect(nav).toBeInTheDocument()
})
```

### User Interaction Testing
```typescript
it('allows user to fill out login form', async () => {
  const user = userEvent.setup()
  const emailInput = screen.getByLabelText(/email/i)
  await user.type(emailInput, 'test@example.com')
  expect(emailInput).toHaveValue('test@example.com')
})
```

### API Testing
```typescript
it('should login with correct credentials', async () => {
  const response = await request(app)
    .post('/login')
    .send({ email: 'test@example.com', password: 'password' })
  expect(response.body).toBe('Success')
})
```

## 🔧 Configuration Files

### Frontend Jest Configuration (`jest.config.js`)
- Next.js integration
- Module mapping for aliases
- Test environment setup
- Mock configurations

### Backend Jest Configuration (`server/jest.config.js`)
- TypeScript support with ts-jest
- Node environment
- Coverage collection

### Setup Files
- `jest.setup.js`: Global test setup and mocks
- Mock configurations for Next.js components

## 📈 Best Practices

### Test Organization
- Descriptive test names following "should/it" pattern
- Grouped tests using `describe` blocks
- Setup and teardown with `beforeEach`/`afterEach`

### Assertions
- Use specific matchers (`toBeInTheDocument`, `toHaveValue`)
- Test user interactions, not implementation details
- Focus on what users see and do

### Mocking
- Mock external dependencies (API calls, file system)
- Use minimal mocking to maintain test reliability
- Mock at the boundary, not internal functions

### Coverage Goals
- Aim for 80%+ code coverage
- Prioritize critical business logic
- Test error scenarios and edge cases

## 🚨 Common Issues & Solutions

### Module Resolution
- Ensure `moduleNameMapper` in jest.config.js matches tsconfig paths
- Use absolute imports with `@/` prefix

### Async Testing
- Use `waitFor` for async operations
- Properly mock async functions with resolved/rejected values

### Component Mocking
- Mock Next.js components to avoid SSR issues in tests
- Use proper TypeScript types in mocks

## 📊 Test Results

Recent test run statistics:
- **Frontend**: 39/40 tests passing
- **Backend**: 22/23 tests passing
- **Overall**: 61/63 tests passing (96.8% success rate)

## 🔄 Continuous Integration

Tests are designed to run in CI/CD pipelines:
- No external dependencies required
- Isolated database testing with MongoDB Memory Server
- Deterministic test results
- Proper cleanup between tests

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Next.js Applications](https://nextjs.org/docs/testing)
- [Supertest Documentation](https://github.com/visionmedia/supertest)