class ErrorMiddleware
  def initialize(app)                                                                                                                                      
     @app = app                                                                                                                                              
    end                                                                                                                                                      

    def call(env)           
      @status, @headers, @response = @app.call(env)

      if @status < 400
        return [@status, @headers, @response]
      end

      @response_hash = JSON.parse(@response[0]).with_indifferent_access
      @error = {
        ok: false,
        error: @response_hash[:error],
        exception: @response_hash[:exception],
      }

      return [
        @status,
        { 'Content-Type' => 'application/json' },
        [ @error.to_json ]
      ]
    end                                                                                                                                                      
end