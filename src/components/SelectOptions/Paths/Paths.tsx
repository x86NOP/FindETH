import React, { FunctionComponent } from 'react';
import { Heading, Typography } from '@mycrypto/ui';
import { DerivationPath } from '../../../config';
import { chunk } from '../../../utils';
import { connect, MapStateToProps } from 'react-redux';
import { ApplicationState } from '../../../store';
import { Row } from 'styled-bootstrap-grid';
import Path from './Path';
import Wallet from '../../../wallets/Wallet';
import ToggleButton from './ToggleButton/ToggleButton';

interface StateProps {
  implementation: Wallet;
  derivationPaths: DerivationPath[];
}

type Props = StateProps;

const Paths: FunctionComponent<Props> = ({ implementation, derivationPaths }) => (
  <>
    <Heading as="h3">Derivation paths</Heading>
    <Typography>Choose the derivation paths to search in.</Typography>
    <ToggleButton state={true}>Select all</ToggleButton>
    <ToggleButton state={false}>Deselect all</ToggleButton>
    {chunk(implementation.getDerivationPaths(), 3).map((paths, index) => (
      <Row key={index}>
        {paths.map(path => (
          <Path key={path.prefix} path={path} isSelected={derivationPaths.includes(path)} />
        ))}
      </Row>
    ))}
  </>
);

const mapStateToProps: MapStateToProps<StateProps, {}, ApplicationState> = state => ({
  implementation: state.wallet.implementation!,
  derivationPaths: state.search.derivationPaths
});

export default connect(mapStateToProps)(Paths);