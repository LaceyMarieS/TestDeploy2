import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { validateDate } from '@mui/x-date-pickers/internals';
import { Description } from '@mui/icons-material';
import { Alert } from '@mui/material';



export default function CreateJobForm({ jobs, setJobs, filter }) {

  const [title , setTitle] = useState("")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(Date.now())
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [qualifications, setQualifications] = useState("")

  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors([]) //reset errors
    
    const validationErrors = validateData()

    if(validationErrors.length > 0){
      setErrors(validationErrors)
    }else{
      //if there are no errors then set a new job
      const newJob = 
      {
        "id": (jobs.length + 1),
        "title": title,
        "date_posted": date,
        "company": name,
        "job_type": type,
        "location": location,
        "description": description,
        "qualifications": qualifications
      }

      //copy the current jobs list
      const tempJobList = [...jobs]
      //add the new job to the temp list
      tempJobList.push(newJob)
      //set the job list equal to the temp list with the new job added
      setJobs(tempJobList)

      //clear the inputs
      setTitle("")
      setName("")
      setLocation("")
      setType("")
      setDate(Date.now)
      setDescription("")
      setQualifications("")
    }
  }

  const validateData = () => {
    const tempErrors =  []

    if(title.length < 10){
      tempErrors.push('Title must be at least 10 characters')
    }
    if(name === null || name.trim() === ""){
      tempErrors.push("Company Name is required")
    }
    if(location === null || location.trim() === ""){
      tempErrors.push("Location is required")
    }
    if(type !== "Full-Time" && type !== "Part-Time" && type !== "Contract"){
      tempErrors.push("Type must be one of the following: Full-time, Part-time, Contract")
    }
    if(description === null || description.trim() === ""){
      tempErrors.push("Job Description is required")
    }
    if(qualifications === null || qualifications.trim() === ""){
      tempErrors.push("Qualifications is required")
    }

    const currentDate = new Date
    const inputDate = new Date(date)

    if(inputDate.setHours(0,0,0,0) < currentDate.setHours(0,0,0,0)){
      tempErrors.push("Date posted must be in the future")
    }

    return tempErrors
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        sx={{ paddingTop: 2, paddingBottom: 2}}
      >
        Post a New Job 
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Job Title"
            fullWidth
            sx={{width: '80%'}}
            onChange={(event)=> { setTitle(event.target.value) }} 
            value={title}
          />
        </Grid>
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Posted"
            defaultValue={dayjs(Date.now())}
            sx={{width: '80%'}}
            onChange={(newValue)=> { setDate(newValue)}}
            value={dayjs(date)}
          />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company Name"
            fullWidth
            sx={{width: '80%'}}
            onChange={(event)=> { setName(event.target.value) }} 
            value={name}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="job-type-select">Job Type</InputLabel>
            <Select
                labelId="job-type-select"
                label="Job Type"
                sx={{width: '80%'}}
                onChange={(event)=> { setType(event.target.value) }} 
                value={type}
            >
              <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
              <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
              <MenuItem value={"Contract"}>Contract</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Location"
            fullWidth
            sx={{width: '80%'}}
            onChange={(event)=> { setLocation(event.target.value) }} 
            value={location}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            sx={{width: '90%'}}
            multiline
            rows={2}
            onChange={(event)=> { setDescription(event.target.value) }} 
            value={description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Qualifications"
            fullWidth
            sx={{width: '90%'}}
            multiline
            rows={2}
            onChange={(event)=> { setQualifications(event.target.value) }} 
            value={qualifications}
          />
        </Grid>
        <Grid item xs={12}>

          <Button variant="contained" type="submit">Submit new Job</Button>
        </Grid>
      </Grid>
      {/* if errors array has an error in it, display the error type alert, otherwise set to none to hide */}

      {errors.length > 0 && (
        <Alert severity='error' sx={{marginTop: 5}}> 
          <ul>
              {errors.map((error) => (
                  <li>{error}</li>
              ))}
          </ul>
        </Alert>
      )}
      
    </form>
  )
} 
