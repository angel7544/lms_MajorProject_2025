# Learning Management System (LMS) - Data Flow Diagram

## Level 0 DFD (Context Diagram)

```mermaid
flowchart TD
    %% Define styles for better printing
    classDef entity fill:#e4f1fe,stroke:#3498db,stroke-width:2px,color:#2c3e50
    classDef process fill:#d4efdf,stroke:#27ae60,stroke-width:2px,color:#2c3e50
    classDef store fill:#fdebd0,stroke:#f39c12,stroke-width:2px,color:#2c3e50
    classDef external fill:#ebdef0,stroke:#8e44ad,stroke-width:2px,color:#2c3e50
    
    %% External entities
    Student([Student]):::entity
    Teacher([Teacher]):::entity
    
    %% Main process
    LMS[Learning Management System]:::process
    
    %% External systems
    Payment([Payment Gateway]):::external
    Storage([Storage Service]):::external
    Email([Email Service]):::external
    
    %% Student flows
    Student -->|Register/Login| LMS
    Student -->|View/Purchase Courses| LMS
    Student -->|Complete Chapters| LMS
    Student -->|Download Certificates| LMS
    Student -->|Submit Requests| LMS
    
    %% Teacher flows
    Teacher -->|Register/Login| LMS
    Teacher -->|Create/Manage Courses| LMS
    Teacher -->|Upload Content| LMS
    
    %% External service interactions
    LMS -->|Process Payments| Payment
    Payment -->|Payment Confirmation| LMS
    
    LMS -->|Store Files| Storage
    Storage -->|Retrieve Files| LMS
    
    LMS -->|Send Notifications| Email
    
    %% Define diagram title and caption
    subgraph DFD0[" "]
        direction TB
        style DFD0 fill:none,stroke:none
    end
```

## Level 1 DFD 

```mermaid
flowchart TD
    %% Define styles for better printing
    classDef entity fill:#e4f1fe,stroke:#3498db,stroke-width:2px,color:#2c3e50
    classDef process fill:#d4efdf,stroke:#27ae60,stroke-width:2px,color:#2c3e50
    classDef store fill:#fdebd0,stroke:#f39c12,stroke-width:2px,color:#2c3e50
    classDef external fill:#ebdef0,stroke:#8e44ad,stroke-width:2px,color:#2c3e50
    
    %% External Entities
    Student([Student]):::entity
    Teacher([Teacher]):::entity
    Payment([Payment Gateway]):::external
    Storage([Storage Service]):::external
    Email([Email Service]):::external
    
    %% Processes
    Auth[1.0<br>Authentication]:::process
    CourseManagement[2.0<br>Course Management]:::process
    ContentDelivery[3.0<br>Content Delivery]:::process
    UserManagement[4.0<br>User Management]:::process
    PaymentProcessing[5.0<br>Payment Processing]:::process
    ProgressTracking[6.0<br>Progress Tracking]:::process
    CertificateGeneration[7.0<br>Certificate Generation]:::process
    
    %% Data Stores
    UserStore[(User Data)]:::store
    CourseStore[(Course Data)]:::store
    ChapterStore[(Chapter Data)]:::store
    ProgressStore[(Progress Data)]:::store
    PurchaseStore[(Purchase Data)]:::store
    CategoryStore[(Category Data)]:::store
    RequestStore[(Request Data)]:::store
    CertificateStore[(Certificate Data)]:::store
    
    %% Authentication flows
    Student -->|Login/Register| Auth
    Teacher -->|Login/Register| Auth
    Auth -->|Store User Data| UserStore
    Auth -->|Verify User| UserStore
    
    %% Course Management flows
    Teacher -->|Create/Edit Courses| CourseManagement
    CourseManagement -->|Store Course Data| CourseStore
    CourseManagement -->|Upload Files| Storage
    Storage -->|File URLs| CourseManagement
    CourseManagement -->|Store Categories| CategoryStore
    
    %% Content Delivery flows 
    Student -->|Browse Courses| ContentDelivery
    ContentDelivery -->|Fetch Courses| CourseStore
    ContentDelivery -->|Fetch Chapters| ChapterStore
    ContentDelivery -->|Fetch Categories| CategoryStore
    ContentDelivery -->|Stream Content| Student
    ContentDelivery -->|Download Materials| Student
    
    %% User Management flows
    Student -->|Update Profile| UserManagement
    Teacher -->|Update Profile| UserManagement
    UserManagement -->|Store User Data| UserStore
    Student -->|Submit Requests| UserManagement
    UserManagement -->|Store Requests| RequestStore
    
    %% Payment flows
    Student -->|Purchase Course| PaymentProcessing
    PaymentProcessing -->|Process Payment| Payment
    Payment -->|Payment Status| PaymentProcessing
    PaymentProcessing -->|Store Purchase| PurchaseStore
    PaymentProcessing -->|Grant Access| CourseStore
    
    %% Progress flows
    Student -->|Complete Chapters| ProgressTracking
    ProgressTracking -->|Update Progress| ProgressStore
    ProgressTracking -->|Check Completion| ChapterStore
    
    %% Certificate flows
    Student -->|Request Certificate| CertificateGeneration
    CertificateGeneration -->|Check Eligibility| ProgressStore
    CertificateGeneration -->|Generate Certificate| CertificateStore
    CertificateGeneration -->|Send Certificate| Email
    CertificateGeneration -->|Download Certificate| Student
    
    %% Define diagram title and caption
    subgraph DFD1[" "]
        direction TB
        style DFD1 fill:none,stroke:none
    end
```

## Level 2 DFD - Course Management Process

```mermaid
flowchart TD
    %% Define styles for better printing
    classDef entity fill:#e4f1fe,stroke:#3498db,stroke-width:2px,color:#2c3e50
    classDef process fill:#d4efdf,stroke:#27ae60,stroke-width:2px,color:#2c3e50
    classDef store fill:#fdebd0,stroke:#f39c12,stroke-width:2px,color:#2c3e50
    classDef external fill:#ebdef0,stroke:#8e44ad,stroke-width:2px,color:#2c3e50
    
    %% External Entities
    Teacher([Teacher]):::entity
    Storage([Storage Service]):::external
    
    %% Processes
    CreateCourse[2.1<br>Create Course]:::process
    ManageChapters[2.2<br>Manage Chapters]:::process
    UploadContent[2.3<br>Upload Content]:::process
    PublishCourse[2.4<br>Publish Course]:::process
    ManageAttachments[2.5<br>Manage Attachments]:::process
    
    %% Data Stores
    CourseStore[(Course Data)]:::store
    ChapterStore[(Chapter Data)]:::store
    AttachmentStore[(Attachment Data)]:::store
    CategoryStore[(Category Data)]:::store
    
    %% Course creation flows
    Teacher -->|Create New Course| CreateCourse
    CreateCourse -->|Store Course Info| CourseStore
    CreateCourse -->|Assign Category| CategoryStore
    
    %% Chapter management flows
    Teacher -->|Add/Edit Chapters| ManageChapters
    ManageChapters -->|Store Chapter Data| ChapterStore
    
    %% Content upload flows
    Teacher -->|Upload Videos/Materials| UploadContent
    UploadContent -->|Send Files| Storage
    Storage -->|Return File URLs| UploadContent
    UploadContent -->|Update Chapter Content| ChapterStore
    
    %% Attachment management flows
    Teacher -->|Add Supporting Files| ManageAttachments
    ManageAttachments -->|Upload Files| Storage
    Storage -->|Return File URLs| ManageAttachments
    ManageAttachments -->|Store Attachment Data| AttachmentStore
    
    %% Publishing flows
    Teacher -->|Set Course Status| PublishCourse
    PublishCourse -->|Update Course Status| CourseStore
    
    %% Define diagram title and caption
    subgraph DFD2A[" "]
        direction TB
        style DFD2A fill:none,stroke:none
    end
```

## Level 2 DFD - Student Learning Process

```mermaid
flowchart TD
    %% Define styles for better printing
    classDef entity fill:#e4f1fe,stroke:#3498db,stroke-width:2px,color:#2c3e50
    classDef process fill:#d4efdf,stroke:#27ae60,stroke-width:2px,color:#2c3e50
    classDef store fill:#fdebd0,stroke:#f39c12,stroke-width:2px,color:#2c3e50
    classDef external fill:#ebdef0,stroke:#8e44ad,stroke-width:2px,color:#2c3e50
    
    %% External Entities
    Student([Student]):::entity
    Payment([Payment Gateway]):::external
    
    %% Processes
    BrowseCourses[3.1<br>Browse Courses]:::process
    EnrollCourse[3.2<br>Enroll in Course]:::process
    AccessContent[3.3<br>Access Content]:::process
    TrackProgress[3.4<br>Track Progress]:::process
    CompleteAssessments[3.5<br>Complete Assessments]:::process
    EarnCertificate[3.6<br>Earn Certificate]:::process
    
    %% Data Stores
    CourseStore[(Course Data)]:::store
    AccessStore[(Access Data)]:::store
    PurchaseStore[(Purchase Data)]:::store
    ChapterStore[(Chapter Data)]:::store
    ProgressStore[(Progress Data)]:::store
    CertificateStore[(Certificate Data)]:::store
    
    %% Course browsing flows
    Student -->|Search/Filter Courses| BrowseCourses
    BrowseCourses -->|Fetch Available Courses| CourseStore
    
    %% Enrollment flows
    Student -->|Purchase/Enroll| EnrollCourse
    EnrollCourse -->|Check if Free| CourseStore
    EnrollCourse -->|Process Payment| Payment
    Payment -->|Confirm Payment| EnrollCourse
    EnrollCourse -->|Record Purchase| PurchaseStore
    EnrollCourse -->|Grant Access| AccessStore
    
    %% Content access flows
    Student -->|View Course Content| AccessContent
    AccessContent -->|Verify Access| AccessStore
    AccessContent -->|Fetch Chapters| ChapterStore
    
    %% Progress tracking flows
    Student -->|Mark Completion| TrackProgress
    TrackProgress -->|Update Progress| ProgressStore
    
    %% Assessment flows
    Student -->|Complete Course| EarnCertificate
    EarnCertificate -->|Check Completion| ProgressStore
    EarnCertificate -->|Generate Certificate| CertificateStore
    
    %% Define diagram title and caption
    subgraph DFD2B[" "]
        direction TB
        style DFD2B fill:none,stroke:none
    end
```

## Database Schema Relationships

```mermaid
erDiagram
    %% Entity relationship diagram styling
    
    %% User relationships
    User ||--o{ Course : creates
    User ||--o{ Access : has
    User ||--o{ Progress : tracks
    User ||--o{ Purchase : makes
    User ||--o{ Certificate : earns
    User ||--o{ Request : submits
    User ||--o{ UserCategory : selects
    User ||--o{ UserGoal : selects
    User ||--o| MailCredentials : has
    
    %% Course relationships
    Course ||--o{ Chapter : contains
    Course ||--o{ Access : grants
    Course ||--o{ Purchase : involves
    Course ||--o{ Certificate : issues
    Course }o--|| Category : belongs-to
    
    %% Chapter relationships
    Chapter ||--o{ Attachment : has
    Chapter ||--o{ Progress : tracked-in
    
    %% Category relationships
    Category ||--o{ UserCategory : selected-by
    Goal ||--o{ UserGoal : selected-by
```

## Data Dictionary

### External Entities
- **Student**: End-user who consumes course content and earns certificates
- **Teacher**: Content creator who develops and manages courses
- **Payment Gateway**: External service for processing payments (Razorpay)
- **Storage Service**: External service for storing files (UploadThing)
- **Email Service**: External service for sending notifications (Resend/Nodemailer)

### Processes
- **Authentication**: Manages user login, registration, and verification
- **Course Management**: Handles course creation, editing, and publishing
- **Content Delivery**: Serves course content to students
- **User Management**: Manages user profiles and requests
- **Payment Processing**: Handles course purchases and payment verification
- **Progress Tracking**: Tracks student progress through courses
- **Certificate Generation**: Creates and distributes course completion certificates

### Data Stores
- **User Data**: Information about students and teachers
- **Course Data**: Course details including title, description, and pricing
- **Chapter Data**: Content modules within courses
- **Progress Data**: Student completion status for chapters
- **Purchase Data**: Records of course purchases
- **Category Data**: Course categories for organization
- **Request Data**: Student support requests
- **Certificate Data**: Course completion certificates 