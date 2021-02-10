import Grid from '@material-ui/core/Grid';
import {Pagination, PaginationItem} from '@material-ui/lab';
import ShowcaseEntryCard from './showcase-entry-card';
import {ShowcaseEntry} from '../models';

interface PaginatedShowcaseListProps {
    currentPage: number;
    numOfPages: number;
    pageEntries: ShowcaseEntry[];
}

export default function PaginatedShowcaseList(props : PaginatedShowcaseListProps){
    const {currentPage, numOfPages, pageEntries} = props;

    return (
        <>
            {/* showcase entries list */}
            {pageEntries.length === 0 ? 
                (<p>No entries</p>)
                :
                (<Grid container spacing={3}> 
                    {pageEntries.map(entry => (
                        <Grid item xs={12} sm={6} md={4} key={entry.id}>
                            <ShowcaseEntryCard {...entry}/>
                        </Grid> 
                    ))}
                </Grid>)
            }

            

            {/* showcase pager */}
            <Pagination
                style={{paddingTop: '10px'}}
                page={currentPage} 
                count={numOfPages}
                renderItem={(item) => (
                    <PaginationItem
                      component='a'
                      href={`/showcase/${item.page}`}
                      page={item.page}
                      {...item}
                    />
                  )}
            />
        </>
    );
}