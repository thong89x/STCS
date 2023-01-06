import React, { useEffect ,useState} from 'react'
import {Segment} from 'semantic-ui-react';
import "../auth/styles/About.css"
export default function About() {
    return (
        <>
        {
        <Segment className ="infoBox">
        <h2 id = "centerText"> Thông tin thành viên nhóm 8 </h2>
        <ol >
            <li> Võ Minh Thông      - MSSV: 20127638</li>
            <li> Bùi Tuấn Dũng      - MSSV: 20127141</li>
            <li> Mai Trần Khánh Duy - MSSV: 20127684</li>
            <li> Nguyễn Hồ Hữu Bằng - MSSV: 20127443</li>
            <li> Trần Minh Trường   - MSSV: 20127656</li>
        </ol>
        </Segment>
        }
        </>
    )
}
