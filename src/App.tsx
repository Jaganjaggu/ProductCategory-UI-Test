import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import './App.css'
import { PivotLayout } from './components/PivotLayout'
function App() {

  return (
    <>
      <FluentProvider theme={webLightTheme}>
        <PivotLayout />
      </FluentProvider>
    </>
  )
}

export default App
