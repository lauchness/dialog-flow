import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Global, css } from '@emotion/core'
import { color, font } from './theme'
import ChatSession from './ChatSession/ChatSession'
import HandleAuth from './HandleAuth/HandleAuth'
import useOAuth2 from './hooks/useOAuth2'
import keys from './secret.json'

const appScopes = [
  // scopes for Dialogflow
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/dialogflow'
]

function App () {
  const globalStyles = css`
    html {
      font-size: 62.5%;
    }

    body {
      margin: 0;
      font-family: ${font.family.regular};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: ${color.darkGray};
      min-height: 100vh;
      font-size: ${font.size.regular};
      line-height: ${font.lineHeight.regular};
    }

    code {
      font-family: ${font.family.code};
    }
  `

  // const oAuth2 = useOAuth2(keys, appScopes);

  return (
    <div>
      <Global styles={globalStyles} />
      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => (
            <ChatSession /*oAuth2={oAuth2}*/ history={history} />
          )}
        />
        {/*<Route
          path="/receive-auth"
          component={({ history }) => (
            <HandleAuth history={history} oAuth2Token={oAuth2.tokens} />
          )}
        />*/}
      </Switch>
    </div>
  )
}

export default App
