import AsyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import { upload } from '../middlewares/multer.js';
import uploadToCloudinary from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';


const registration = AsyncHandler(async (req, res) => {
    // 1. Get user clientInformation
    // 2. Validate user input
    // 3. Check if user already exists
    // 4. Check for images
    // 5. Upload them to cloudinary
    // 6. Check if images are uploaded
    // 7. Hash user password
    // 8. Create user
    // 9. Generate token
    // 10. Send response

    //1st step
    const { username, email, fullname, password } = req.body;

    //2nd step
    // if (!username || !email || !fullname || !password) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    if([username, email, fullname, password].some((field) => field === '')) {
        throw new ApiError(400, 'All fields are required');
    }
    //another way to validate
    // if([username, email, fullname, password].includes('')) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    //3rd step
    const userExistance = await User.findOne(
        {
         $or: [{ username }, { email }] 
        }
    )
    if (userExistance) {
        throw new ApiError(400, 'User already exists');
    }    

    //4th step
    const avatarPath = req.files.avatar[0].path;

    let coverPath;
    if(req.files && req.files.coverImage.length > 0) {
        coverPath = req.files.coverImage[0].path;
    }

    if(!avatarPath) {
        throw new ApiError(400, 'Avatar is required');
    }
    
    //5th step
   const avatar = await uploadToCloudinary(avatarPath);
   const coverImage = await uploadToCloudinary(coverPath);

   //6th step
   if(!avatar) {
    throw new ApiError(400, 'Avatar is required');
}
    //5th step
    // let avatarUrl;
    // let coverImageUrl;
    // if (avatar) {
    //     avatarUrl = await cloudinary.uploader.upload(avatar, {
    //         folder: 'avatars',
    //         width: 150,
    //         height: 150,
    //         crop: 'fill' 
    //     });
    // }

    // if (coverImage) {
    //     coverImageUrl = await cloudinary.uploader.upload(coverImage, {
    //         folder: 'coverImages',
    //         width: 800,
    //         height: 300,
    //         crop: 'fill'
    //     });
    // }

    //6th step
    // if (avatar && !avatarUrl) {
    //     return res.status(500).json({ message: "Avatar upload failed" });
    // }
    
    // if (coverImage && !coverImageUrl) {
    //     return res.status(500).json({ message: "Cover image upload failed" });
    // }

    //7th step
    // const hashedPassword = await bcrypt.hash(password, 12);

    //8th step
    // const user = new User({
    //     username,
    //     email,
    //     fullname,    
    //     avatar: avatarUrl ? avatarUrl.secure_url : 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1616955933/avatars/default_avatar.png',
    //     coverImage: coverImageUrl ? coverImageUrl.secure_url : 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1616955933/avatars/default_cover.png',
    //     password: hashedPassword
    // });

    //8th step
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || " ",
        password
    });

    const registeredUser = await User.findById(user._id).select('-password');

    if(!registeredUser) {
        throw new ApiError(500, 'User registration failed');
    }

    return res.status(201).json(
        new ApiResponse(201, registeredUser, 'User registered successfully')
    );
    // await user.save();

    //9th step
    // const token = jwt.sign(
    //     { userId: user._id },
    //     process.env.JWT_SECRET,
    //     { expiresIn: '1d' }
    // );

    //10th step
    // res.status(201).json({ token, user });
    //res.status(201).json({ message: 'User registered' });

    


});




export { registration };