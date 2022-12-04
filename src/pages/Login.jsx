import { Link } from "react-router-dom";

function Login() {
	return (
		<section>
			<div className="container px-6 py-12 h-full">
				<div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 dark:text-white">
					<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
							className="w-full"
							alt="Phone"
						/>
					</div>
					<div className="md:w-8/12 lg:w-5/12 lg:ml-20">
						<div className="mb-6">
							<label
								className="form-check-label inline-block text-gray-800 dark:text-white"
								htmlFor="rememberMeCheck"
							>
								Email
							</label>
							<input
								type="text"
								className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Your email"
							/>
						</div>

						<div className="mb-6">
							<label
								className="form-check-label inline-block text-gray-800 dark:text-white"
								htmlFor="rememberMeCheck"
							>
								Password
							</label>
							<input
								type="password"
								className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Your password"
							/>
						</div>

						<div className="flex justify-between items-center mb-6">
							<div className="form-group form-check">
								<input
									type="checkbox"
									id="rememberMeCheck"
									className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								/>
								<label
									className="form-check-label inline-block text-gray-800 dark:text-white"
									htmlFor="rememberMeCheck"
								>
									Remember me
								</label>
							</div>
							<Link
								to="/forgot-password"
								className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
							>
								Forgot password?
							</Link>
						</div>

						<button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
							Sign in
						</button>

						<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
							<p className="text-center font-semibold mx-4 mb-0">OR</p>
						</div>

						<button className="px-7 py-3 bg-[#3b5998] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 320 512"
								className="w-4 h-4 mr-2  rounded"
							>
								<path
									fill="currentColor"
									d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
								/>
							</svg>
							Continue with Facebook
						</button>
						<button className="px-7 py-3 bg-[#1a6ef5] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center">
							<svg
								viewBox="0 0 48 48"
								width="16"
								height="16"
								className="w-4 h-4 mr-2 rounded"
							>
								<title>Google Logo</title>
								<clipPath id="g">
									<path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
								</clipPath>
								<g class="colors" clip-path="url(#g)">
									<path fill="#FBBC05" d="M0 37V11l17 13z" />
									<path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
									<path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
									<path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
								</g>
							</svg>
							Continue with Google
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
