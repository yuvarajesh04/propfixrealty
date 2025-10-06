import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from './App';

export function render(url: string) {
  try {
    const html = ReactDOMServer.renderToString(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    );
    
    const helmet = Helmet.renderStatic();
    
    return { 
      html, 
      helmet: {
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        link: helmet.link.toString(),
      }
    };
  } catch (error) {
    console.error('SSR Render Error:', error);
    throw error;
  }
}