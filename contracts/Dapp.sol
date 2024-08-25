// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Permission {

    address public teacher;
    address public mentor;
    address public student;

    constructor(address _teacher, address _mentor, address _student) {
        teacher = _teacher;
        mentor = _mentor;
        student = _student;
    }

    
    event ApprovalStatusChanged(uint256 requestId, bool passed);

    enum Status {Pending, Approved, Rejected_Teacher, Rejected_Mentor, Rejected}

    mapping(uint256=>bool) public Teacher_Approval;
    mapping(uint256=>bool) public Mentor_Approval;
    mapping(uint256=>Status) public requestStatus;

    

    modifier onlyTeacher {
        require(msg.sender==teacher);
        _;
    }
    modifier onlyMentor {
        require(msg.sender==mentor);
        _;
    }

    function list(uint256 id) public{
        Teacher_Approval[id] = false;
        Mentor_Approval[id] = false;
        requestStatus[id] = Status.Pending;
    }

    function TeacherApproval(uint256 id, bool _passed) onlyTeacher public{
        Teacher_Approval[id] = _passed;
        if(_passed==false){
            requestStatus[id] = Status.Rejected_Teacher;
        }else{
            requestStatus[id] = Status.Approved;
        }
    }

    function MentorApproval(uint256 id,bool _passed) onlyMentor public{
        Mentor_Approval[id] = _passed;
        if(_passed==false){
            requestStatus[id] = Status.Rejected_Teacher;
        }else{
            requestStatus[id] = Status.Approved;
        }
    }

    function getRequestStatus(uint256 id) public view returns (uint256) {
        if (Mentor_Approval[id] && Teacher_Approval[id]) {
            // return Status.Approved;
            return 1;
        } else if (!Mentor_Approval[id] && !Teacher_Approval[id]) {
            // return Status.Pending;
            return 2;
        } else if (!Teacher_Approval[id] && Mentor_Approval[id]) {
            // return Status.Rejected_Teacher;
            return 3;
        } else if (!Mentor_Approval[id] && Teacher_Approval[id]) {
            // return Status.Rejected_Mentor;
            return 4;
        } else {
            // return Status.Rejected; 
            return 5;
        }
    }



}