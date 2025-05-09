//number 1
function FeatureToggle(featureName, isEnabled, userGroupAccess) {
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
  }
  
  FeatureToggle.prototype.canAccess = function(userRole) {
    return this.isEnabled && this.userGroupAccess.includes(userRole);
  };
  
  FeatureToggle.prototype.toggleFeature = function(flag) {
    this.isEnabled = flag;
  };
  
  const newFeature = new FeatureToggle("DarkMode", false, ["betaTesters", "admins"]);
  
  const roles = ["guest", "betaTesters", "admins", "user"];
  for (let role of roles) {
    if (newFeature.canAccess(role)) {
      console.log(`${role} can access the feature.`);
    } else {
      console.log(`${role} cannot access the feature.`);
    }
  }
  
  newFeature.toggleFeature(true);
  
  roles.forEach(role => {
    switch (role) {
      case "admins":
      case "betaTesters":
        console.log(`${role}:`, newFeature.canAccess(role) ? "Access granted" : "Access denied");
        break;
      case "guest":
      case "user":
      default:
        console.log(`${role}:`, newFeature.canAccess(role) ? "Access granted" : "Access denied");
    }
  });
  //number 2

function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails; 
    this.logs = logs; 
  }
  
  TimeLog.prototype.calculateTotalEarnings = function () {
    let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
    return totalHours * this.projectDetails.hourlyRate;
  };
  
  TimeLog.prototype.filterLogsByDate = function (startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.logs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= start && logDate <= end;
    });
  };
  
  TimeLog.prototype.exceedsWeeklyHours = function (weekStartDate) {
    const start = new Date(weekStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6); 
  
    const weeklyLogs = this.filterLogsByDate(start.toISOString(), end.toISOString());
    let totalHours = weeklyLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
  
    if (totalHours > 40) {
      return true;
    } else {
      return false;
    }
  };
  const logs = [
    { date: "2025-05-05", hoursWorked: 8 },
    { date: "2025-05-06", hoursWorked: 9 },
    { date: "2025-05-07", hoursWorked: 10 },
    { date: "2025-05-08", hoursWorked: 8 },
    { date: "2025-05-09", hoursWorked: 8 },
  ];
  
  const project = { name: "Website Redesign", hourlyRate: 50 };
  
  const freelancerLog = new TimeLog("marrion", project, logs);
  
  console.log("Total Earnings: $", freelancerLog.calculateTotalEarnings());
  
  const filtered = freelancerLog.filterLogsByDate("2025-05-06", "2025-05-08");
  console.log("Filtered Logs:", filtered);
  
  const exceeds = freelancerLog.exceedsWeeklyHours("2025-05-05");
  console.log("Exceeds 40 hours in week?", exceeds);
  
  //3

function Order(customer, items, status) {
    this.customer = customer; 
    this.items = items;       
    this.status = status;     
  }
  

  Order.prototype.getTotalCost = function () {
    return this.items.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);
  };
  

  Order.prototype.updateStatusOnPayment = function (paymentReceived) {
    if (paymentReceived) {
      this.status = "paid";
    } else {
      this.status = "pending";
    }
  };
  
 
  Order.prototype.getOrderUrgency = function () {
    let urgency;
    switch (this.status) {
      case "pending":
        urgency = "High";
        break;
      case "paid":
        urgency = "Medium";
        break;
      case "shipped":
        urgency = "Low";
        break;
      default:
        urgency = "Unknown";
    }
  
    if (this.items.length > 5 && this.status === "pending") {
      urgency = "Critical";
    }
  
    return urgency;
  };
  
  const customerInfo = { name: "John Doe", email: "john@example.com" };
  const orderItems = [
    { productName: "Laptop", quantity: 1, unitPrice: 1000 },
    { productName: "Mouse", quantity: 2, unitPrice: 25 },
  ];
  
  const myOrder = new Order(customerInfo, orderItems, "pending");
  
  console.log("Total Cost: $", myOrder.getTotalCost());
  
  myOrder.updateStatusOnPayment(true);
  console.log("Updated Status:", myOrder.status);
  
  console.log("Order Urgency:", myOrder.getOrderUrgency());
  //4


function Employee(id, name, performanceMetrics, feedback) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = performanceMetrics; 
    this.feedback = feedback;
  }
  
  
  Employee.prototype.getAverageScore = function () {
    const scores = Object.values(this.performanceMetrics);
    const total = scores.reduce((sum, val) => sum + val, 0);
    return total / scores.length;
  };
  
  
  Employee.prototype.classifyPerformance = function () {
    const avg = this.getAverageScore();
    if (avg >= 4.5) {
      return "Excellent";
    } else if (avg >= 3.5) {
      return "Good";
    } else if (avg >= 2.5) {
      return "Average";
    } else {
      return "Needs Improvement";
    }
  };
  
 
  Employee.prototype.addFeedback = function (newFeedback, minScore = 3) {
    const avg = this.getAverageScore();
    if (avg < minScore) {
      this.feedback.push(newFeedback);
      console.log("Feedback added due to low score.");
    } else {
      console.log("No feedback added; performance is acceptable.");
    }
  };

  const metrics = { communication: 4, efficiency: 3, reliability: 2.5 };
  const employee = new Employee(101, "Kran Jhon", metrics, ["Needs to improve reliability."]);
  
  console.log("Average Score:", employee.getAverageScore());
  console.log("Performance Level:", employee.classifyPerformance());
  
  employee.addFeedback("Consider time management training.", 3.5);
  console.log("Feedback List:", employee.feedback);
  //5


function Course(title, instructor, students) {
    this.title = title;
    this.instructor = instructor; 
    this.students = students; 
  }
  
  Course.prototype.getCompletedStudents = function () {
    return this.students
      .filter(student => student.completionStatus)
      .map(student => student.name);
  };
  
  Course.prototype.countStudentsByExpertise = function (expertiseArea) {
    return this.instructor.expertise === expertiseArea ? this.students.length : 0;
  };
  
  
  Course.prototype.instructorMessage = function () {
    const count = this.students.length;
    if (count >= 5) {
      console.log(`${this.instructor.name} is teaching a large class of ${count} students.`);
    } else {
      console.log(`${this.instructor.name} is mentoring a small group of ${count} students.`);
    }
  };
  

  const instructorInfo = { name: "Jhon", expertise: "Computer Science" };
  
  const studentList = [
    { name: "Rebeka", completionStatus: true },
    { name: "Joilin", completionStatus: false },
    { name: "Shalin", completionStatus: true },
    { name: "Emebet", completionStatus: true },
    { name: "Kisanet", completionStatus: false }
  ];
  
  const course = new Course("Intro to Algorithms", instructorInfo, studentList);
  
  console.log("Students who completed the course:", course.getCompletedStudents());
  console.log("Number of students in Computer Science expertise area:", course.countStudentsByExpertise("Computer Science"));
  course.instructorMessage();
  