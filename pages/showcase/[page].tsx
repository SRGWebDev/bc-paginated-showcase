import PaginatedShowcaseList from '../../components/paginated-showcase-list';
import {ShowcaseEntry} from '../../models';
import {useRouter} from 'next/router';

const PAGE_SIZE = 6; // num of showcase entries to display on a page

interface ShowcasePageProps {
  entries: ShowcaseEntry[];
  numOfPages: number;
  page: number;
}

/* Display a list of showcase entries for a given page.*/
export default function ShowcasePage ({entries, numOfPages, page}: ShowcasePageProps) {
  const router = useRouter();

  // TODO improve loading state style
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <PaginatedShowcaseList
        currentPage={page}
        numOfPages={numOfPages}
        pageEntries={entries} />
  );
}

/**
 * Pre-render a path per "page" of showcase entries
 * TODO figure out how to cache entryIds[] (to elim call to getEntryIds() per page)
 */
export async function getStaticPaths() {
  const MAX_DEFAULT_PATHS = 5; // generate first 5 pages, fallback for the rest
  const entryIds = await getEntryIds();
  const numOfPages = calcPageCount(entryIds.length);
  let paths = [], pgIdx = 0;

  for(; pgIdx < numOfPages && pgIdx < MAX_DEFAULT_PATHS; pgIdx++) {
    paths.push({ params: { page: `${pgIdx+1}` }});
  }

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps(ctx) {
  const page = parseInt(ctx.params.page, 10);
  const allEntryIds = await getEntryIds();
  const numOfPages = calcPageCount(allEntryIds.length) || 1;

  if(page > numOfPages) {
    console.error('Page out of range');
    return {
      redirect: {
        destination: '/showcase/1',
        permanent: false,
      },
    };
  }

  const entries = await getPageEntries(page, allEntryIds);

  return {
    props: {
      numOfPages,
      page,
      entries 
    }
  };
}

/**
 * Helper functions used to pre-render showcase pages
 */

function getEntryIds() {
  return fetchRetry('https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds')
    .catch(() => []); // TODO toast error to user?
}

function getEntry(id) {
  return fetchRetry(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${id}`);
}

function fetchRetry(url, retries = 3) {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      if (retries > 0) {
        return fetchRetry(url, --retries);
      } else {
        console.error(res);
        throw new Error(res.statusText);
      }
    });
}

/**
 * fetch list of showcase entry data for a specific page
 */
async function getPageEntries(pageNum: number, allEntryIds: number[]): Promise<ShowcaseEntry[]>{
  const skipTo = (pageNum - 1) * PAGE_SIZE,
    takeUntil = skipTo + PAGE_SIZE,
    pageEntryIds = allEntryIds.slice(skipTo, takeUntil);

  return await Promise.allSettled(pageEntryIds.map(id => getEntry(id)))
    .then((results) =>
      // filter out failed entries
      // TODO this means some pages will not be "full"
      results.reduce((acc, res) => {
        if(res.status === 'fulfilled' && res.value.error === undefined){
          return [...acc, res.value];
        }
        return acc;
      }, [])
    );
}

function calcPageCount(entriesCount: number){
  return Math.ceil(entriesCount/PAGE_SIZE);
}