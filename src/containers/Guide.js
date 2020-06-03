import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import governorates from "../data/governorates"

const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: "bbcsmall",
    },
    select: {
        fontSize: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      media: {
        height: "50%",
        paddingTop: '95%',
        objectFit: 'cover'
      }

  }))

export default function Guide() {
    const classes = useStyles()

    const [governorate, setGovernorate] = React.useState('');

  const handleChange = (event) => {
    setGovernorate(event.target.value);
  };

    console.log("data: ", governorates.data)
    return (
        <div className={classes.root}>
            <Typography align="center" variant="h5" className={classes.title}>
            دليل مستشفيات العزل في الجمهورية
          </Typography>
        
          <Box display="flex" flexDirection="column" justifyContent="center">
              
              <Box>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">اختر المحافظة</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={governorate}
                    onChange={handleChange}
                    className={classes.select}
                    >
                    <MenuItem value="">
                        <em>غير محدد</em>
                    </MenuItem>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                    { governorates.data && governorates.data.map(gov => <MenuItem value={gov.id}>{gov.name}</MenuItem>)

                    }
                    </Select>
                    <FormHelperText>اختر محافظة ليتم عرض المستشفيات</FormHelperText>
                </FormControl>
            </Box>
            <Box>
            <Card className={classes.root}>
              
                {/* <CardMedia
                  className={classes.media}
                  // image="/images/governorates/7.jpg"
                  image={`/images/governorates/${governorate}.jpg`}
                  title="Contemplative Reptile"
                /> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    محتوي
                  </Typography>
                 
                </CardContent>

            </Card>
            </Box>
        </Box>
            
        </div>
    )
}
