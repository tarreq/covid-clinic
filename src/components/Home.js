import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: "bbcsmall",
      fontSize: 24
    },

  }))

export default function Home() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            الصفحة الرئيسية
        </div>
    )
}
