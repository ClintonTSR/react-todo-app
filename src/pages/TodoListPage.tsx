import { Box, Fab, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add'
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import AddTodoDialog from "../components/customs/AddTodoDialog";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { getTodos } from "../queries/todo";

const TodoListPage = () => {
    const navigate = useNavigate();
    const popupState = usePopupState({ variant: 'dialog', popupId: 'demoMenu' })

    const { data: todos, isLoading } = getTodos();

    return (
        <Box>
            <AddTodoDialog popupState={popupState}/>
            <Stack marginY={2} marginX="auto" maxWidth="md" minWidth="50vw" rowGap={2}>
                <Typography variant="h4">My Todo List</Typography>
                <Fab color="primary" aria-label="add" variant="extended"
                     {...bindTrigger(popupState)}
                     sx={{
                         position: 'fixed',
                         bottom: '30px',
                         right: '30px',
                     }}>
                    <AddIcon/>
                    Add New List
                </Fab>
                {
                    // data?.thisUser && data.thisUser.todoLists.map(list =>
                    //     <Box key={list.id} padding={2} borderRadius={1} border="1px solid grey"
                    //          sx={{
                    //              cursor: 'pointer',
                    //              ":hover": {
                    //                  boxShadow: 2
                    //              }
                    //          }}
                    //          onClick={() => showTodoList(list.id)}>
                    //         <Typography fontWeight={'bold'}>{list.name}</Typography>
                    //         <Typography>List Description</Typography>
                    //     </Box>
                    // ) || 
                    <Typography> - Empty List - </Typography>
                }
            </Stack>
        </Box>
    );
};

export default TodoListPage;