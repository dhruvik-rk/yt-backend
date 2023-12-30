import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

//step to register user
/*
(1) get detail of user from frontend
(2) validation of data -> not empty data
(3) check if user is already exits -> by email or username
(4) check for images and avtar and (4.5)upload it on cloudinary
(5) check user object -> create entry in db
(6) remove password and refresh token field from response
(7) check that user is created or not
(8) return response
*/

const registerUser = asyncHandler( async (req, res) => {
    /* res.status(200).json({
        message: "hello everyone"
    }) */ // -> check postman responce

    //step1
    const { username, email, fullname, password } = req.body
    console.log(`Username - ${username} & Email - ${email}`)

    //check for all fields
    /* if (username==="") {
        throw new ApiError(400, "username is required")
    } */
    //step2
    if([username, email, fullname, password].some( field => field?.trim()==="" ))
    {
        throw new ApiError(400, "All fields are compulsory");
    }

    //step3 -> use model(here User model) to search user for existance 
    const existedUser = User.findOne({
        //use operator to checking fields
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "user with email or username is already exist")
    }

    //step4 -> multer give access of req.files
    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalPath) { throw new ApiError(400, "Avatar file is required") }

    //step4.5
    const avatar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) { throw new ApiError(400, "Avatar file is required") }

    //step5 -> entry in db (use User model to create user)
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

    //step6 step7
    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!userCreated) { throw new ApiError(500, "Something wrong while registering user") }

    //step8
    return res.status(201).json(
        new ApiResponse(200, userCreated, "User registered successfully ")
    )

})

export { registerUser }