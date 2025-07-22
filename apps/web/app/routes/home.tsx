export function meta() {
  return [{ title: 'Home' }, { name: 'description', content: 'Welcome to the Web App!' }]
}

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <main style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
        <p style={{ marginTop: '20px' }}>
          <a href='/tamagui-example' style={{ color: '#0070f3', textDecoration: 'underline' }}>
            View Tamagui Example
          </a>
        </p>
      </main>
    </div>
  )
}
