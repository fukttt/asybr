import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  TrashIcon,
  PencilIcon,
  StatusOnlineIcon,
} from '@heroicons/react/outline';
import 'tailwindcss/tailwind.css';
import MainLayout from './comps/mainLayout';
import './App.css';

const HomePage = () => {
  // eslint-disable-next-line prefer-destructuring
  const ipcRenderer = window.require('electron').ipcRenderer;
  const [data, setData] = useState<any[string]>([]);
  ipcRenderer.on('fromMain', async (_data, file) => {
    setData(file.filter((el: string) => el.length >= 1));
  });
  useEffect(() => {
    console.log('asdad');
    ipcRenderer.send('toMain', 'getAccounts');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainLayout title="Dashboard">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="font-bold">Accounts in file [{data.length} pcs]</h1>
          {data.map((el: string, id: number) => (
            <div
              key={el}
              className="flex justify-between items-center px-1.5 py-1 mt-1 rounded-md border-2"
            >
              <div className="flex flex-row items-center">
                <p className="text-xs font-semibold">{id}</p>
                <StatusOnlineIcon className="ml-2 w-4 h-4 text-green-600 animate-pulse" />
                <p className="ml-2 text-sm">{el}</p>
              </div>
              <div>
                <TrashIcon className="w-4 h-4 text-red-800 cursor-pointer hover:text-red-600" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1 className="font-bold">LOGS</h1>
          <p className="text-ellipsis">Inited</p>
        </div>
      </div>
    </MainLayout>
  );
};

const Team = () => {
  return (
    <MainLayout title="Team">
      <h1>Team</h1>
    </MainLayout>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/team" component={Team} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}
