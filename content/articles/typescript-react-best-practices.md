---
title: 'TypeScript Best Practices for React Development'
date: '2025-08-05'
description: 'Essential TypeScript patterns and practices that will make your React code more robust, maintainable, and developer-friendly.'
tags: ['TypeScript', 'React', 'Best Practices', 'Development']
published: true
---

# TypeScript Best Practices for React Development

TypeScript has become an essential tool for React development, providing type safety, better IDE support, and improved code maintainability. Here are the best practices I've learned from building large-scale React applications with TypeScript.

## Defining Component Props

Always define explicit interfaces for your component props:

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  disabled = false, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

## Generic Components

Use generics for reusable components that work with different data types:

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

## Custom Hooks with TypeScript

Type your custom hooks properly for better reusability:

```typescript
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

## Event Handlers

Properly type event handlers for better type safety:

```typescript
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value)
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  // Handle form submission
}
```

## Advanced Patterns

### Discriminated Unions

Use discriminated unions for components with different states:

```typescript
type LoadingState = {
  status: 'loading'
}

type SuccessState = {
  status: 'success'
  data: User[]
}

type ErrorState = {
  status: 'error'
  error: string
}

type ApiState = LoadingState | SuccessState | ErrorState

const UserList: React.FC<{ state: ApiState }> = ({ state }) => {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>
    case 'success':
      return <div>{state.data.map(user => user.name)}</div>
    case 'error':
      return <div>Error: {state.error}</div>
  }
}
```

## Configuration and Environment

Create a typed configuration system:

```typescript
interface Config {
  apiUrl: string
  environment: 'development' | 'staging' | 'production'
  features: {
    analytics: boolean
    debugging: boolean
  }
}

const config: Config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  environment: (process.env.NODE_ENV as Config['environment']) || 'development',
  features: {
    analytics: process.env.NODE_ENV === 'production',
    debugging: process.env.NODE_ENV === 'development',
  }
}
```

## Conclusion

TypeScript significantly improves the React development experience by catching errors at compile time, providing better IDE support, and making code more self-documenting. These patterns will help you write more robust and maintainable React applications.
