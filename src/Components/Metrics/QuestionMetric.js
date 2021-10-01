import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import './Metrics.scss';
import * as notebookService from '../../Services/NotebookService.js';
import { Refresh } from '@material-ui/icons';
import StudentsPerQuestion from './StudentsPerQuestion.js';
import { PALETTE } from '../../Utils/constants';
import { FormattedMessage } from 'react-intl';

const QuestionMetric = ({ socketConnection, classConnected }) => {
  const [exercises, setExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);

  const loadExercises = () => {
    if (socketConnection) {
      setLoadingExercises(true);
      notebookService.getQuestionMetricsByClass(
        socketConnection,
        classConnected.classId,
        setExercises,
        setLoadingExercises,
      );
    }
  };
  useEffect(loadExercises, [socketConnection]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton
                size='small'
                style={{ color: PALETTE.LIGHTER_GREEN }}
                onClick={() => {
                  loadExercises();
                }}
              >
                {loadingExercises ? (
                  <CircularProgress
                    style={{ color: PALETTE.LIGHTER_GREEN, padding: '4px' }}
                    size={16}
                  />
                ) : (
                  <Refresh />
                )}
              </IconButton>
            </TableCell>
            <TableCell></TableCell>
            <TableCell align='center'>
              <FormattedMessage id='toDo' />
            </TableCell>
            <TableCell align='center'>
              <FormattedMessage id='doing' />
            </TableCell>
            <TableCell align='center'>
              <FormattedMessage id='done' />
            </TableCell>
            <TableCell align='center'>
              <FormattedMessage id='percentRight' />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((row) => (
            <StudentsPerQuestion key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionMetric;
