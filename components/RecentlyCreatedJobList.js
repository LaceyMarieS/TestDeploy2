import Typography from '@mui/material/Typography';
import RecentlyCreatedJob from './RecentlyCreatedJob';
import { TextField } from '@mui/material';

export default function RecentlyCreatedJobList({ jobs, filter }) {
  


  return <>
    <Typography
      variant="h4"
      sx={{ paddingTop: 4, paddingBottom: 2}}
    >
      Recently Created Job Postings
    </Typography>

    {jobs.map((job, index) => {
      return <RecentlyCreatedJob key={index} job={job}/>
    })}
  </>

}
