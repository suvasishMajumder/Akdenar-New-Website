import { NextRequest, NextResponse } from "next/server";
// import connectDB from '@/lib/mongodb';
// import { Job, type IJob } from '@/models/job';
// import {
//     createJobSchema,
//     updateJobSchema,
//     jobQuerySchema,
//     type CreateJobInput,
//     type UpdateJobInput,
//     type JobQueryInput
// } from '@/lib/validations/job.schema';
// import { validateBody, validateQuery, sanitizeData } from '@/lib/validations/validation';
// import { slugify } from '@/lib/utils/slugify';

// // Type definitions
// type ApiResponse<T = any> = Promise<NextResponse<T>>;

// export class JobController {
//     //CREATE: Create a new job
//     static async createJob(request: NextRequest): ApiResponse {
//         try {
//             // Validate request body
//             const validationResult = await validateBody(createJobSchema, request);
//             if (validationResult instanceof NextResponse) {
//                 return validationResult;
//             }

//             const { data: validatedData } = validationResult;

//             // Sanitize data
//             const sanitizedData = sanitizeData(validatedData);

//             // Generate unique slug
//             let slug = slugify(sanitizedData.title);
//             let counter = 1;
//             let isUnique = false;

//             await connectDB();

//             // Check for existing slug
//             while (!isUnique) {
//                 const existingJob = await Job.findOne({ slug });
//                 if (!existingJob) {
//                     isUnique = true;
//                 } else {
//                     slug = `${slugify(sanitizedData.title)}-${counter}`;
//                     counter++;
//                 }
//             }

//             // Create job with slug
//             const jobData: Partial<IJob> = {
//                 ...sanitizedData,
//                 slug,
//                 isActive: true,
//                 applicationCount: 0,
//                 publishedAt: new Date(),
//             };

//             const job = await Job.create(jobData);

//             return NextResponse.json(
//                 {
//                     success: true,
//                     message: 'Job created successfully',
//                     data: {
//                         id: job._id,
//                         title: job.title,
//                         slug: job.slug,
//                         department: job.department,
//                         location: job.location,
//                         type: job.type,
//                         category: job.category,
//                         createdAt: job.createdAt,
//                     },
//                 },
//                 { status: 201 }
//             );

//         } catch (error: any) {
//             console.error('Create job error:', error);

//             // Handle duplicate errors
//             if (error.code === 11000) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'A job with similar title already exists',
//                     },
//                     { status: 409 }
//                 );
//             }

//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to create job',
//                     details: process.env.NODE_ENV === 'development' ? error.message : undefined,
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // READ: Get all jobs with filtering
//     static async getJobs(request: NextRequest): ApiResponse {
//         try {
//             // Validate query parameters
//             const validationResult = validateQuery(jobQuerySchema, request);
//             if (validationResult instanceof NextResponse) {
//                 return validationResult;
//             }

//             const { data: queryParams } = validationResult;

//             await connectDB();

//             // Build filter query
//             const filter: any = {};

//             // Status filter (default to active jobs only for public)
//             filter.isActive = queryParams.isActive ?? true;
//             filter.expiresAt = { $gt: new Date() };

//             // Category filter
//             if (queryParams.category) {
//                 filter.category = queryParams.category;
//             }

//             // Job type filter
//             if (queryParams.type) {
//                 filter.type = queryParams.type;
//             }

//             // Location filter (case-insensitive partial match)
//             if (queryParams.location) {
//                 filter.location = { $regex: queryParams.location, $options: 'i' };
//             }

//             // Experience level filter
//             if (queryParams.experienceLevel) {
//                 filter.experienceLevel = queryParams.experienceLevel;
//             }

//             // Salary range filter
//             if (queryParams.minSalary || queryParams.maxSalary) {
//                 filter['salaryRange.min'] = {};
//                 filter['salaryRange.max'] = {};

//                 if (queryParams.minSalary) {
//                     filter['salaryRange.min']['$gte'] = queryParams.minSalary;
//                 }
//                 if (queryParams.maxSalary) {
//                     filter['salaryRange.max']['$lte'] = queryParams.maxSalary;
//                 }
//             }

//             // Search filter (text search)
//             if (queryParams.search) {
//                 filter.$text = { $search: queryParams.search };
//             }

//             // Calculate pagination
//             const page = queryParams.page;
//             const limit = queryParams.limit;
//             const skip = (page - 1) * limit;

//             // Define sort
//             const sort: any = {};
//             if (queryParams.sortBy) {
//                 sort[queryParams.sortBy] = queryParams.sortOrder === 'asc' ? 1 : -1;
//             } else {
//                 sort.publishedAt = -1; // Default sort by latest
//             }

//             // Execute queries in parallel
//             const [jobs, total] = await Promise.all([
//                 Job.find(filter)
//                     .select('-__v')
//                     .sort(sort)
//                     .skip(skip)
//                     .limit(limit)
//                     .lean(),
//                 Job.countDocuments(filter),
//             ]);

//             // Calculate pagination info
//             const totalPages = Math.ceil(total / limit);
//             const hasNextPage = page < totalPages;
//             const hasPrevPage = page > 1;

//             return NextResponse.json({
//                 success: true,
//                 data: jobs,
//                 pagination: {
//                     page,
//                     limit,
//                     total,
//                     totalPages,
//                     hasNextPage,
//                     hasPrevPage,
//                     nextPage: hasNextPage ? page + 1 : null,
//                     prevPage: hasPrevPage ? page - 1 : null,
//                 },
//                 filters: {
//                     applied: Object.keys(queryParams).length > 0,
//                     ...queryParams,
//                 },
//             });

//         } catch (error: any) {
//             console.error('Get jobs error:', error);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to fetch jobs',
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // READ: Get single job by ID or slug
//     static async getJobById(request: NextRequest, id: string): ApiResponse {
//         try {
//             await connectDB();

//             // Check if id is ObjectId format or slug
//             const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

//             let job;
//             if (isObjectId) {
//                 job = await Job.findOne({
//                     _id: id,
//                     isActive: true,
//                     expiresAt: { $gt: new Date() }
//                 }).select('-__v');
//             } else {
//                 job = await Job.findOne({
//                     slug: id,
//                     isActive: true,
//                     expiresAt: { $gt: new Date() }
//                 }).select('-__v');
//             }

//             if (!job) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'Job not found or expired',
//                     },
//                     { status: 404 }
//                 );
//             }

//             // Increment view count (optional)
//             await Job.findByIdAndUpdate(job._id, {
//                 $inc: { viewCount: 1 },
//             });

//             return NextResponse.json({
//                 success: true,
//                 data: job,
//             });

//         } catch (error: any) {
//             console.error('Get job error:', error);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to fetch job',
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // UPDATE: Update job by ID
//     static async updateJob(request: NextRequest, id: string): ApiResponse {
//         try {
//             // Validate request body
//             const validationResult = await validateBody(updateJobSchema, request);
//             if (validationResult instanceof NextResponse) {
//                 return validationResult;
//             }

//             const { data: updateData } = validationResult;

//             await connectDB();

//             // Check if job exists
//             const existingJob = await Job.findById(id);
//             if (!existingJob) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'Job not found',
//                     },
//                     { status: 404 }
//                 );
//             }

//             // If title is being updated, generate new slug
//             let updatePayload: any = { ...updateData };
//             if (updateData.title && updateData.title !== existingJob.title) {
//                 let newSlug = slugify(updateData.title);
//                 let counter = 1;
//                 let isUnique = false;

//                 while (!isUnique) {
//                     const jobWithSlug = await Job.findOne({ slug: newSlug, _id: { $ne: id } });
//                     if (!jobWithSlug) {
//                         isUnique = true;
//                     } else {
//                         newSlug = `${slugify(updateData.title)}-${counter}`;
//                         counter++;
//                     }
//                 }

//                 updatePayload.slug = newSlug;
//             }

//             // Update job
//             const updatedJob = await Job.findByIdAndUpdate(
//                 id,
//                 { ...updatePayload, updatedAt: new Date() },
//                 { new: true, runValidators: true }
//             ).select('-__v');

//             return NextResponse.json({
//                 success: true,
//                 message: 'Job updated successfully',
//                 data: updatedJob,
//             });

//         } catch (error: any) {
//             console.error('Update job error:', error);

//             if (error.code === 11000) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'Job with similar details already exists',
//                     },
//                     { status: 409 }
//                 );
//             }

//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to update job',
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // DELETE: Delete job by ID
//     static async deleteJob(request: NextRequest, id: string): ApiResponse {
//         try {
//             await connectDB();

//             // Check if job exists
//             const job = await Job.findById(id);
//             if (!job) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'Job not found',
//                     },
//                     { status: 404 }
//                 );
//             }

//             // Soft delete (set isActive to false) or hard delete
//             const method = request.headers.get('X-Delete-Method') || 'soft';

//             if (method === 'soft') {
//                 // Soft delete
//                 await Job.findByIdAndUpdate(id, {
//                     isActive: false,
//                     deletedAt: new Date(),
//                 });

//                 return NextResponse.json({
//                     success: true,
//                     message: 'Job deactivated successfully',
//                 });
//             } else {
//                 // Hard delete
//                 await Job.findByIdAndDelete(id);

//                 return NextResponse.json({
//                     success: true,
//                     message: 'Job deleted permanently',
//                 });
//             }

//         } catch (error: any) {
//             console.error('Delete job error:', error);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to delete job',
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // PATCH: Update job status (active/inactive)
//     static async updateJobStatus(request: NextRequest, id: string): ApiResponse {
//         try {
//             const body = await request.json();
//             const { isActive } = body;

//             if (typeof isActive !== 'boolean') {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'isActive must be a boolean',
//                     },
//                     { status: 400 }
//                 );
//             }

//             await connectDB();

//             const job = await Job.findByIdAndUpdate(
//                 id,
//                 { isActive, updatedAt: new Date() },
//                 { new: true }
//             ).select('-__v');

//             if (!job) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'Job not found',
//                     },
//                     { status: 404 }
//                 );
//             }

//             return NextResponse.json({
//                 success: true,
//                 message: `Job ${isActive ? 'activated' : 'deactivated'} successfully`,
//                 data: job,
//             });

//         } catch (error: any) {
//             console.error('Update job status error:', error);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to update job status',
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // GET: Get job statistics
//     static async getJobStats(request: NextRequest): ApiResponse {
//         try {
//             await connectDB();

//             const stats = await Job.aggregate([
//                 {
//                     $facet: {
//                         // Total jobs
//                         totalJobs: [{ $count: 'count' }],

//                         // Active jobs
//                         activeJobs: [
//                             { $match: { isActive: true, expiresAt: { $gt: new Date() } } },
//                             { $count: 'count' },
//                         ],

//                         // Jobs by category
//                         jobsByCategory: [
//                             { $group: { _id: '$category', count: { $sum: 1 } } },
//                             { $sort: { count: -1 } },
//                         ],

//                         // Jobs by type
//                         jobsByType: [
//                             { $group: { _id: '$type', count: { $sum: 1 } } },
//                             { $sort: { count: -1 } },
//                         ],

//                         // Jobs by location
//                         jobsByLocation: [
//                             { $group: { _id: '$location', count: { $sum: 1 } } },
//                             { $sort: { count: -1 } },
//                             { $limit: 10 },
//                         ],

//                         // Recent jobs (last 7 days)
//                         recentJobs: [
//                             {
//                                 $match: {
//                                     createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
//                                 },
//                             },
//                             { $count: 'count' },
//                         ],

//                         // Expiring soon (next 7 days)
//                         expiringSoon: [
//                             {
//                                 $match: {
//                                     isActive: true,
//                                     expiresAt: {
//                                         $gte: new Date(),
//                                         $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//                                     },
//                                 },
//                             },
//                             { $count: 'count' },
//                         ],
//                     },
//                 },
//             ]);

//             // Format the response
//             const formattedStats = {
//                 totalJobs: stats[0].totalJobs[0]?.count || 0,
//                 activeJobs: stats[0].activeJobs[0]?.count || 0,
//                 recentJobs: stats[0].recentJobs[0]?.count || 0,
//                 expiringSoon: stats[0].expiringSoon[0]?.count || 0,
//                 byCategory: stats[0].jobsByCategory,
//                 byType: stats[0].jobsByType,
//                 byLocation: stats[0].jobsByLocation,
//             };

//             return NextResponse.json({
//                 success: true,
//                 data: formattedStats,
//                 generatedAt: new Date().toISOString(),
//             });

//         } catch (error: any) {
//             console.error('Get job stats error:', error);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to fetch job statistics',
//                 },
//                 { status: 500 }
//             );
//         }
//     }

//     // GET: Get similar jobs
//     static async getSimilarJobs(request: NextRequest, id: string): ApiResponse {
//         try {
//             await connectDB();

//             // Get current job
//             const currentJob = await Job.findById(id);
//             if (!currentJob) {
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: 'Job not found',
//                     },
//                     { status: 404 }
//                 );
//             }

//             // Find similar jobs (same category or location, excluding current job)
//             const similarJobs = await Job.find({
//                 _id: { $ne: currentJob._id },
//                 isActive: true,
//                 expiresAt: { $gt: new Date() },
//                 $or: [
//                     { category: currentJob.category },
//                     { location: currentJob.location },
//                     { type: currentJob.type },
//                 ],
//             })
//                 .select('-__v')
//                 .sort({ publishedAt: -1 })
//                 .limit(5)
//                 .lean();

//             return NextResponse.json({
//                 success: true,
//                 data: similarJobs,
//                 currentJob: {
//                     id: currentJob._id,
//                     title: currentJob.title,
//                     category: currentJob.category,
//                     location: currentJob.location,
//                 },
//             });

//         } catch (error: any) {
//             console.error('Get similar jobs error:', error);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Failed to fetch similar jobs',
//                 },
//                 { status: 500 }
//             );
//         }
//     }
// }

// // Helper function to handle API routes
// export const jobHandler = {
//     POST: JobController.createJob,
//     GET: JobController.getJobs,
// };
