import { Alert, Button } from '@mui/material';
import { FC } from 'react';
import {
  useAccount, useConnect, useDisconnect, useEnsName,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

/**
 *
 * @returns JSX.Element
 */
const Index: FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <div>
      {isConnected
        ? (
          <Alert className="mt-5 flex" severity="success">
            Connected to
            {ensName ?? address}
            <Button variant="contained" onClick={() => { disconnect(); }}>disConnect</Button>
          </Alert>
        )
        : (
          <Button
            variant="contained"
            onClick={() => { connect(); }}
          >
            connect
          </Button>
        )}
    </div>
  );
};
export default Index;
