# Learning Management System (LMS) - Data Flow Diagram

## Level 0 DFD (Context Diagram)

```mermaid
flowchart TD
    Student([Student])
    Teacher([Teacher])
    LMS[Learning Management System]
    Payment([Payment Gateway])
    Storage([Storage Service])
    Email([Email Service])
    
    Student -->|Register/Login| LMS
    Student -->|View/Purchase Courses| LMS
    Student -->|Complete Chapters| LMS
    Student -->|Download Certificates| LMS
    Student -->|Submit Requests| LMS
    
    Teacher -->|Register/Login| LMS
    Teacher -->|Create/Manage Courses| LMS
    Teacher -->|Upload Content| LMS
    
    LMS -->|Process Payments| Payment
    Payment -->|Payment Confirmation| LMS
    
    LMS -->|Store Files| Storage
    Storage -->|Retrieve Files| LMS
    
    LMS -->|Send Notifications| Email
```

## Level 1 DFD

```mermaid
flowchart TD
    %% External Entities
    Student([Student])
    Teacher([Teacher])
    Payment([Payment Gateway])
    Storage([Storage Service])
    Email([Email Service])
    
    %% Processes
    Auth[1.0\nAuthentication]
    CourseManagement[2.0\nCourse Management]
    ContentDelivery[3.0\nContent Delivery]
    UserManagement[4.0\nUser Management]
    PaymentProcessing[5.0\nPayment Processing]
    ProgressTracking[6.0\nProgress Tracking]
    CertificateGeneration[7.0\nCertificate Generation]
    
    %% Data Stores
    UserStore[(User Data)]
    CourseStore[(Course Data)]
    ChapterStore[(Chapter Data)]
    ProgressStore[(Progress Data)]
    PurchaseStore[(Purchase Data)]
    CategoryStore[(Category Data)]
    RequestStore[(Request Data)]
    CertificateStore[(Certificate Data)]
    
    %% Flows - Authentication
    Student -->|Login/Register| Auth
    Teacher -->|Login/Register| Auth
    Auth -->|Store User Data| UserStore
    Auth -->|Verify User| UserStore
    
    %% Flows - Course Management
    Teacher -->|Create/Edit Courses| CourseManagement
    CourseManagement -->|Store Course Data| CourseStore
    CourseManagement -->|Upload Files| Storage
    Storage -->|File URLs| CourseManagement
    CourseManagement -->|Store Categories| CategoryStore
    
    %% Flows - Content Delivery
    Student -->|Browse Courses| ContentDelivery
    ContentDelivery -->|Fetch Courses| CourseStore
    ContentDelivery -->|Fetch Chapters| ChapterStore
    ContentDelivery -->|Fetch Categories| CategoryStore
    ContentDelivery -->|Stream Content| Student
    ContentDelivery -->|Download Materials| Student
    
    %% Flows - User Management
    Student -->|Update Profile| UserManagement
    Teacher -->|Update Profile| UserManagement
    UserManagement -->|Store User Data| UserStore
    Student -->|Submit Requests| UserManagement
    UserManagement -->|Store Requests| RequestStore
    
    %% Flows - Payment Processing
    Student -->|Purchase Course| PaymentProcessing
    PaymentProcessing -->|Process Payment| Payment
    Payment -->|Payment Status| PaymentProcessing
    PaymentProcessing -->|Store Purchase| PurchaseStore
    PaymentProcessing -->|Grant Access| CourseStore
    
    %% Flows - Progress Tracking
    Student -->|Complete Chapters| ProgressTracking
    ProgressTracking -->|Update Progress| ProgressStore
    ProgressTracking -->|Check Completion| ChapterStore
    
    %% Flows - Certificate Generation
    Student -->|Request Certificate| CertificateGeneration
    CertificateGeneration -->|Check Eligibility| ProgressStore
    CertificateGeneration -->|Generate Certificate| CertificateStore
    CertificateGeneration -->|Send Certificate| Email
    CertificateGeneration -->|Download Certificate| Student
```

## Level 2 DFD - Course Management Process

```mermaid
flowchart TD
    %% External Entities
    Teacher([Teacher])
    Storage([Storage Service])
    
    %% Processes
    CreateCourse[2.1\nCreate Course]
    ManageChapters[2.2\nManage Chapters]
    UploadContent[2.3\nUpload Content]
    PublishCourse[2.4\nPublish Course]
    ManageAttachments[2.5\nManage Attachments]
    
    %% Data Stores
    CourseStore[(Course Data)]
    ChapterStore[(Chapter Data)]
    AttachmentStore[(Attachment Data)]
    CategoryStore[(Category Data)]
    
    %% Flows
    Teacher -->|Create New Course| CreateCourse
    CreateCourse -->|Store Course Info| CourseStore
    CreateCourse -->|Assign Category| CategoryStore
    
    Teacher -->|Add/Edit Chapters| ManageChapters
    ManageChapters -->|Store Chapter Data| ChapterStore
    
    Teacher -->|Upload Videos/Materials| UploadContent
    UploadContent -->|Send Files| Storage
    Storage -->|Return File URLs| UploadContent
    UploadContent -->|Update Chapter Content| ChapterStore
    
    Teacher -->|Add Supporting Files| ManageAttachments
    ManageAttachments -->|Upload Files| Storage
    Storage -->|Return File URLs| ManageAttachments
    ManageAttachments -->|Store Attachment Data| AttachmentStore
    
    Teacher -->|Set Course Status| PublishCourse
    PublishCourse -->|Update Course Status| CourseStore
```

## Level 2 DFD - Student Learning Process

```mermaid
flowchart TD
    %% External Entities
    Student([Student])
    Payment([Payment Gateway])
    
    %% Processes
    BrowseCourses[3.1\nBrowse Courses]
    EnrollCourse[3.2\nEnroll in Course]
    AccessContent[3.3\nAccess Content]
    TrackProgress[3.4\nTrack Progress]
    CompleteAssessments[3.5\nComplete Assessments]
    EarnCertificate[3.6\nEarn Certificate]
    
    %% Data Stores
    CourseStore[(Course Data)]
    AccessStore[(Access Data)]
    PurchaseStore[(Purchase Data)]
    ChapterStore[(Chapter Data)]
    ProgressStore[(Progress Data)]
    CertificateStore[(Certificate Data)]
    
    %% Flows
    Student -->|Search/Filter Courses| BrowseCourses
    BrowseCourses -->|Fetch Available Courses| CourseStore
    
    Student -->|Purchase/Enroll| EnrollCourse
    EnrollCourse -->|Check if Free| CourseStore
    EnrollCourse -->|Process Payment| Payment
    Payment -->|Confirm Payment| EnrollCourse
    EnrollCourse -->|Record Purchase| PurchaseStore
    EnrollCourse -->|Grant Access| AccessStore
    
    Student -->|View Course Content| AccessContent
    AccessContent -->|Verify Access| AccessStore
    AccessContent -->|Fetch Chapters| ChapterStore
    
    Student -->|Mark Completion| TrackProgress
    TrackProgress -->|Update Progress| ProgressStore
    
    Student -->|Complete Course| EarnCertificate
    EarnCertificate -->|Check Completion| ProgressStore
    EarnCertificate -->|Generate Certificate| CertificateStore
```

## Database Schema Relationships

```mermaid
erDiagram
    User ||--o{ Course : creates
    User ||--o{ Access : has
    User ||--o{ Progress : tracks
    User ||--o{ Purchase : makes
    User ||--o{ Certificate : earns
    User ||--o{ Request : submits
    User ||--o{ UserCategory : selects
    User ||--o{ UserGoal : selects
    User ||--o| MailCredentials : has
    
    Course ||--o{ Chapter : contains
    Course ||--o{ Access : grants
    Course ||--o{ Purchase : involves
    Course ||--o{ Certificate : issues
    Course }o--|| Category : belongs-to
    
    Chapter ||--o{ Attachment : has
    Chapter ||--o{ Progress : tracked-in
    
    Category ||--o{ UserCategory : selected-by
    Goal ||--o{ UserGoal : selected-by
``` 