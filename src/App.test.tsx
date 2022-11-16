import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';

jest.useFakeTimers();

describe('Testing App Component', () => {
 it('App root file loads properly', () => {
   const testRenderer: any = renderer.create(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>).toJSON();
   expect(testRenderer.children.length).toBe(2);
//    expect(testRenderer).toMatchSnapshot();
 });
});