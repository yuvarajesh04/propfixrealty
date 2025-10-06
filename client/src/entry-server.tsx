import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from './App';
import projectApi from './services/projectApi';

export async function render(url: string) {
  let initialData = { projects: [] };

  try {
    // Fetch data directly - no hooks needed
    const projects = await projectApi.getProjects();
    initialData = { projects: projects || [] };
  } catch (error) {
    console.error('SSR data fetch error:', error);
  }
  
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App initialData={initialData} />
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
    },
    initialData
  };
}