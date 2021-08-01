import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import './Metrics.scss';
import { PALETTE } from '../../Utils/constants';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FormattedMessage } from 'react-intl';

const StudentsPerQuestion = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUp htmlColor={PALETTE.LIGHTER_GREEN} />
            ) : (
              <KeyboardArrowDown htmlColor={PALETTE.LIGHTER_GREEN} />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell align='center'>{row.toDo}</TableCell>
        <TableCell align='center'>{row.doing}</TableCell>
        <TableCell align='center'>{row.done}</TableCell>
        <TableCell align='center'>{row.percentRight}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id='student' />
                    </TableCell>
                    <TableCell align='right'>
                      <FormattedMessage id='time' />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.participants.map((participant) => (
                    <TableRow key={participant._id}>
                      <TableCell>{participant.name}</TableCell>
                      <TableCell align='right'>
                        {formatDistanceToNow(
                          new Date(participant.timeStarted),
                          { addSuffix: true, locale: ptBR },
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default StudentsPerQuestion;
